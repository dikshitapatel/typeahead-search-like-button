import React from 'react'

type SuggestionListProps = {
    suggestions : any[],
    onSuggestionClick : (res:any) => void;

}

const SuggestionList = (props: SuggestionListProps) => {
  return (
    <React.Fragment>
        {props.suggestions.map((suggestion, index)=> {
            return(
                <li key={index} onClick={()=>props.onSuggestionClick(suggestion)} style={{listStyle:"none"}}>
                    {suggestion.name}
                </li>
            )
        })}
      
    </React.Fragment>
  )
}

export default SuggestionList
