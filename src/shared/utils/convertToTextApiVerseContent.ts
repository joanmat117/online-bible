export const convertToTextApiVerseContent = (content:Array<string|Record<string,any>>) => {
    if (!content) return '';
    
    return content.map((item) => {
      if (typeof item === 'string') {
        return item;
      } 
    else if (typeof item === 'object'){
      if(item.text){
        return item.text
      }
      if(item.lineBreak){
        return '\n'
      }
    }
      return '';
    }).join(' ');
  }

