
/*******************************************************************************
 *
 *      Product           : Marcelo Bossle
 *      ServiceModulePart : Portal
 *      Object            : cString (javascript file)
 *
 ******************************************************************************/

function oString_mReplaceAll(p_string, p_from, p_to) {
    return p_string.replace(new RegExp(p_from, 'g'), p_to);
}

function oString_mReplaceDecimalSeperatorForLoad(p_string) {
    if (localStorage.scs_Culture === "de-DE") {
        return p_string.replace(".", ",");
    }
    else if (localStorage.scs_Culture === "fr-FR") {
        return p_string.replace(".", ",");
    }
    else if (localStorage.scs_Culture === "nl-BE") {
        return p_string.replace(".", ",");
    }
    else {
        return p_string.replace(",", ".");
    }
}

function oString_mReplaceDecimalSeperatorForSave(p_string) {
    return p_string.replace(new RegExp(",", 'g'), ".");
}
