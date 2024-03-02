export const caesarCipher = (str, shift, lang, decrypt = false) => {
    if(lang === 'latin'){
      const s = decrypt ? (26 - shift) % 26 : shift;
      const n = s > 0 ? s : 26 + (s % 26);
      return [...str]
        .map((l, i) => {
          const c = str.charCodeAt(i);
          //console.log(c)
          if (c >= 65 && c <= 90)
            return String.fromCharCode(((c - 65 + parseInt(n)) % 26) + 65);
          if (c >= 97 && c <= 122)
            return String.fromCharCode(((c - 97 + parseInt(n)) % 26) + 97);
          return l;
        })
        .join('');
    }else if(lang === 'greek'){
      const s = decrypt ? (24 - shift) % 24 : shift;
      const n = s > 0 ? s : 24 + (s % 24);
      return [...str]
        .map((l, i) => {
          const c = str.charCodeAt(i);
          //console.log("Letter: " + l +  "\nCharCode: " + c + "\ntest: " + String.fromCharCode(((c - 945 + parseInt(n)) % 24) + 945))
          if (c >= 945 && c <= 977)
            return String.fromCharCode(((c - 945 + parseInt(n)) % 24) + 945);
          if (c >= 913 && c <= 937)
            return String.fromCharCode(((c - 913 + parseInt(n)) % 24) + 913);
          return l;
        })
        .join('');
    }

};