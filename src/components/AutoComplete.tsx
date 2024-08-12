import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import SuggestionList from './SuggestionList';

function useDebounce(value: string, delay: number) {
    const [debounceValue, setDebounceValue] = useState(value);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebounceValue(value);
      }, delay);
  
      return () => {
        clearTimeout(timer);
      };
    }, [value, delay]);
  
    return debounceValue;
  }

type AutoCompleteProps = {
    placeholder : string;
    fetchSuggestions : (query: string) => Promise<string[]>;
    // dataKey : string;
    customLoading : React.ReactNode;
    onSelect: (res:any) => void;
    // onChange: (input: string)=> void;
}
const AutoComplete = (props : AutoCompleteProps ) => {
    const[inputValue, setInputValue] = useState("");
    const[suggestions,setSuggestions] = useState<any[]>([]);
    const[loading,setLoading] = useState(false);
    const[error,setError] = useState("");
    const cache = useRef<Map<string, any[]>>(new Map());

    const debouncedInputValue = useDebounce(inputValue, 500);


    const handleInputChange = (e : ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        // props.onChange(inputValue);
    }

    const handleSuggestionClick = (suggestion : string) =>{
        props.onSelect(suggestion);
        setSuggestions([]);
    }

    useEffect(() => {
        const fetchSuggestions = async (query: string) => {
          setError('');
          setLoading(true);
    
          if (cache.current.has(query)) {
            console.log('cache used');
            setSuggestions(cache.current.get(query) || []);
            setLoading(false);
            return;
          }
    
          try {
            let result = await props.fetchSuggestions(query);
            cache.current.set(query, result);
            setSuggestions(result);
          } catch (e) {
            setError('Failed to fetch suggestions');
          } finally {
            setLoading(false);
          }
        };
    
        if (debouncedInputValue.length > 1) {
          fetchSuggestions(debouncedInputValue);
        } else {
          setSuggestions([]);
        }
      }, [debouncedInputValue, props.fetchSuggestions]);
    
    return (
    <div className="container">
        <input
        type="text"
        placeholder={props.placeholder}
        value={inputValue}
        onChange={(e)=>handleInputChange(e)}
        />
        
        {(suggestions.length>0 || loading || error) && 
        (<ul>
            {error && <div>{error}</div>}
            {loading && <div>Loading.....</div>}
            <SuggestionList suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            // dataKey={props.dataKey}
            />
        </ul>
        )
        
        
        }
    </div>
  )
}

export default AutoComplete
