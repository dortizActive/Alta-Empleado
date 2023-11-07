import { Logger, LogLevel } from "@pnp/logging";
import { HttpRequestError } from "@pnp/queryable";
import { IColumn, IContextualMenuItem } from '@fluentui/react';
import { IDocument } from "../../models/ShpInterfaces";

export class Utils {

    public static CombineRutas(rutas: string[]):string {
        let rutafinal: string = "";

        const rutasInput: string[] = [];

        for (let i: number = 0; i < (rutas.length); i++) {
             const ruta1: string = rutas[i];

            if (ruta1 != undefined) {
                const ruta: string = rutas[i].replace(/^\/|\/$/g, '');
                rutasInput.push(`/${ruta}`);
                rutafinal += `${rutasInput[i]}`;
            }
        }

        return rutafinal;

    }

    public static  async handleError(e: Error | HttpRequestError): Promise<string> {

        let errormessage="";
            // eslint-disable-next-line
        if (e.hasOwnProperty( "isHttpRequestError")) {
      
          // we can read the json from the response
          const data = await (<HttpRequestError>e).response.json();
      
          // parse this however you want
          const message = typeof data["odata.error"] === "object" ? data["odata.error"].message.value : e.message;
      
          // we use the status to determine a custom logging level
          const level: LogLevel = (<HttpRequestError>e).status === 404 ? LogLevel.Warning : LogLevel.Info;
      
          errormessage=message;
          // create a custom log entry
          Logger.log({
            data,
            level,
            message
          });
      
        } else {
            errormessage=String(e);
          // not an HttpRequestError so we just log message
          Logger.error(e);
        }
        return errormessage;
      }
  
    public static  isNullOrUndefined(value: any): boolean {
        return value === null || value === undefined || isNaN(value);
      }
     public static round(number: number, decimals: any) {

        // var rounded = Math.round(Math.abs(number) * Math.pow(10, decimals)) / Math.pow(10, decimals);
        // if (number < 0) {
        //   rounded = -rounded;
        // }
        // return Number(rounded.toFixed(decimals));
        
        const multiplier = Math.pow(10, decimals || 0);
        return Math.round(number * multiplier) / multiplier;
    }
   /**
     * Returns image url for the given extension.
     * The urls points to https://spoprod-a.akamaihd.net..... !!!
     */
    public GetImgUrlByFileExtension(extension: string): string {
        // cuurently in SPFx with React I didn't find different way of getting the image
        // feel free to improve this
        const imgRoot: string = "https://spoprod-a.akamaihd.net/files/odsp-next-prod_ship-2017-04-21-sts_20170503.001/odsp-media/images/filetypes/16/";
        let imgType = "genericfile.png";
        imgType = extension + ".png";

        switch (extension) {
            case "jpg":
            case "jpeg":
            case "jfif":
            case "gif":
            case "png":
                imgType = "photo.png";
                break;
            case "folder":
                imgType = "folder.svg";
                break;
            case "onenote":
                imgType="onetoc.svg";
        }
        return imgRoot + imgType;
    }
    /**
     * Returns formated date string
     */
    public GetFormatedDate(dateValue: Date): string {
        if (dateValue) {
            let date: string = dateValue.toLocaleString();
            if (date.indexOf(',') > -1) {
                date = date.split(',')[0];
            }
            return date;
        }
        return "";
    }
    /**
     * Returns formated date string
     */
    public GetFormatedDateString(dateString: string): string {
        if (dateString) {
            const convertedDate: Date = new Date(dateString);
            let date: string = convertedDate.toLocaleString();
            if (date.indexOf(',') > -1) {
                date = date.split(',')[0];
            }
            return date;
        }
        return "";
    }
    /**
     * Returns formated date string
     */
    public GetDateOnly(dateString: string): string {
        let shortDate = "";
        if (dateString) {
            const dateItems = dateString.split(" ");
            if (dateItems.length > 1) {
                shortDate = dateItems[0];
            }
        }
        return shortDate;
    }
    /**
     * Returns the file name by spliting the file url
     */
    public GetFileName(fileAbsoluteUrl: string): string {
        if (fileAbsoluteUrl) {
            const items = fileAbsoluteUrl.split('/');
            return items[items.length - 1];
        }
        return "";
    }

    public static cleanHTML(html:string)
    {
        if(html == undefined){
            return "";
        }
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
    }
    public GetSortingMenuItems(column: IColumn, onSortColumn: (column: IColumn, isSortedDescending: boolean) => void): IContextualMenuItem[] {
        const menuItems = [];
        if (column.data == Number) {
            menuItems.push(
                {
                    key: 'smallToLarger',
                    name: 'Smaller to larger',
                    canCheck: true,
                    checked: column.isSorted && !column.isSortedDescending,
                    onClick: () => onSortColumn(column, false)
                },
                {
                    key: 'largerToSmall',
                    name: 'Larger to smaller',
                    canCheck: true,
                    checked: column.isSorted && column.isSortedDescending,
                    onClick: () => onSortColumn(column, true)
                }
            );
        }
        else if (column.data == Date) {
            menuItems.push(
                {
                    key: 'oldToNew',
                    name: 'Older to newer',
                    canCheck: true,
                    checked: column.isSorted && !column.isSortedDescending,
                    onClick: () => onSortColumn(column, false)
                },
                {
                    key: 'newToOld',
                    name: 'Newer to Older',
                    canCheck: true,
                    checked: column.isSorted && column.isSortedDescending,
                    onClick: () => onSortColumn(column, true)
                }
            );
        }
        else
        //(column.data == String) 
        // NOTE: in case of 'complex columns like Taxonomy, you need to add more logic'
        {
            menuItems.push(
                {
                    key: 'aToZ',
                    name: 'A to Z',
                    canCheck: true,
                    checked: column.isSorted && !column.isSortedDescending,
                    onClick: () => onSortColumn(column, false)
                },
                {
                    key: 'zToA',
                    name: 'Z to A',
                    canCheck: true,
                    checked: column.isSorted && column.isSortedDescending,
                    onClick: () => onSortColumn(column, true)
                }
            );
        }
        return menuItems;
    }

    public OpenDocument(docItem: IDocument, thisContext: any, openPDFInClient: boolean): void {

        // eslint-disable-next-line
  
    try {
        let documentWebUrl: string = "";
        
        if (docItem.FileRef.toLowerCase().indexOf(".pdf") > 0) {
            documentWebUrl = window.location.origin + docItem.FileRef + "?web=1";
        }
        else
        if(docItem.FileRef.toLowerCase().indexOf(".doc") > 0 ||docItem.FileRef.toLowerCase().indexOf(".xls") > 0 ||docItem.FileRef.toLowerCase().indexOf(".onenote") > 0 || docItem.HTML_x0020_File_x0020_Type=="OneNote.Notebook") {
            documentWebUrl = docItem.ParentWebUrl + "/_layouts/15/Doc.aspx?sourcedoc=" + encodeURIComponent( docItem.UniqueId  ) + "&action=default";
        }
        else {
         
            documentWebUrl = docItem.FileRef;
            
        }

       window.open(documentWebUrl);
    }
    catch (ex) {
        //optionaly, we can notify the user;
        // cuurently - do nothing
    }
}
    public GetFilterValues(column: IColumn, arrayObjects: any[], onFilterClickCallback: (ev?: React.MouseEvent<HTMLElement>, item?: IContextualMenuItem) => void): IContextualMenuItem[] {

        let filters: IContextualMenuItem[] = [];
        for (let i = 0; i < arrayObjects.length; i++) {
            let item = arrayObjects[i];
            let value: string = item[column.key];
            if (item[column.key]) {
                //in case we have specific column, we can add more complex logic
                if (column.data === "Taxonomy") {
                    const columnValue: string = item[column.key];
                    const valuesAsStrings: string[] = columnValue.split(";");
                    valuesAsStrings.map((termValue) => {
                        termValue = termValue.trim();
                        if (termValue && !this._IsValuePresented(filters, termValue)) {
                            filters.push(
                                {
                                    key: termValue,
                                    name: termValue,
                                    data: column.key,
                                    onClick: onFilterClickCallback,
                                    isChecked: i === 0 ? true : false
                                });
                        }
                    });
                }
                else {
                    if (!this._IsValuePresented(filters, value)) {
                        filters.push(
                            {
                                key: value,
                                name: value,
                                data: column.key,
                                onClick: onFilterClickCallback,
                                isChecked: i === 0 ? true : false
                            });
                    }
                }
            }
        }
        return filters;
    }

    private _IsValuePresented(currentValues: IContextualMenuItem[], newValue: string): boolean {

        for (let i = 0; i < currentValues.length; i++) {
            if (currentValues[i].key === newValue) {
                return true;
            }
        }
        return false;
    }
 
    public  getFileExtension(fileName: string): string {
        const extension = fileName.split('.').pop();
        return extension ? extension.toLowerCase() : '';
      }

}