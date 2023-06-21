
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';



export class Utils {
    
    public static InjectCSS(css:string[])
    {
        css.forEach((cssUrl:string)=>{
        // inject the style sheet
                const head: any = document.getElementsByTagName("head")[0] || document.documentElement;
                let customStyle: HTMLLinkElement = document.createElement("link");
                customStyle.href = cssUrl;
                customStyle.rel = "stylesheet";
                customStyle.type = "text/css";
                head.insertAdjacentElement("beforeEnd", customStyle);
            }
        );
    }
 

    public static EsWorkbench(): boolean {
        return window.location.href.indexOf("workbench.aspx")>-1 && Environment.type!=EnvironmentType.Local;
    }

}