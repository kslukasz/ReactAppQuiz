const FiltratedList = (list , buttons) => {  
  let copyList = [...list];
  // console.log(copyList)
  copyList = copyList.filter((element)=>( 
      element.content.toLowerCase().includes(buttons.search.toLowerCase())
    )
  )
  const copyListUp = copyList.filter((element) => { return element.classPriority });
  const copyListDown = copyList.filter((element) => { return element.classPriority === false })
  if (buttons.newOne === "up")  {
    copyList.sort((a, b) => {
      const date1 = new Date(a.date);
      const date2 = new Date(b.date);
      return date2 - date1
    }); return copyList;
  } else if (buttons.newOne === "down") {
    copyList.sort((a, b) => {
      const date1 = new Date(a.date);
      const date2 = new Date(b.date);
      return date1 - date2
    }); return copyList;
  } else if (buttons.priority=== "up") {
    return copyListUp.concat(copyListDown);
  } else if (buttons.priority === "down") {
    return copyListDown.concat(copyListUp);
  } else return copyList;   
}

export default FiltratedList