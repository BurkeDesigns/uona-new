import { es } from "./es"
import { fr } from "./fr"

const obj = {es, fr};

export const dictionary = (locale: string, text?: string | number) =>{
    if(!text) return obj[locale];
    if(!obj[locale]) {
        console.warn(`Locale "${locale}" does not exist in the dictionary.`)
        return text;
    }
    if (typeof text === 'number') text = text.toString();
    let lowerText = text?.toLowerCase();
    if (obj[locale][lowerText] == null) {
        console.warn(`"${lowerText}" does not exist in locale "${locale}", please add it to the dictionary.`)
        return text;
    };
    return obj[locale][lowerText];
}