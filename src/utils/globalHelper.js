export const dateFormat = (date = "")=>{
    const newDate = new Date(date)
    return newDate.toLocaleDateString('id-ID',{
        day: "numeric",
        month: "long",
        year: "numeric"
    })
}