
export const escapeHtml = (str: string) =>{
    const combination = [
        { a:/&/g, b:'&amp;'},
        { a:/>/g, b:'&gt;'},
        { a:/</g, b:'&lt;'},
        { a:/"/g, b:'&quot;'},
        { a:/'/g, b:'&#x27;'},
        { a:/`/g, b:'&#x60;'},
    ]
    combination.forEach(c => {
        str = str.replace(c.a, c.b)
    })
    return str
}