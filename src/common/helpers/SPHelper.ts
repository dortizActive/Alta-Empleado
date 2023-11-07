export class SPHelper {
    
    public static concatURL(fragments:string[]) {
        // eliminar cualquier slash al principio o al final de cada fragmento
        fragments = fragments.map(fragment => fragment.replace(/^\/|\/$/g, ""));
        // usar join para unir los fragmentos con un slash único
        return '/' + fragments.join('/');
    }
    // eslint-disable-next-line
    public static LookupValueToString(value: any | Array<any>): string {
        return value.map((item: { key: any; text: any; }) => { return `${item.key};#${item.text}`; }).join(";#");
    }
    // eslint-disable-next-line
    public static LookupValueFromString(value: string): Array<any> {
        if (value === null) {
            return [];
        }
        else {
            const splitArray = value.split(';#');
            const values = splitArray.filter((item, idx) => (idx % 2 === 0))
                .map((comp, idx) => {
                    return { key: Number(comp), text: (splitArray.length >= idx * 2 + 1) ? splitArray[idx * 2 + 1] : '' };
                });
            return values;
        }
    }
}