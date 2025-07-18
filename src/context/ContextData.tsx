import { createContext } from 'react'; 
import { ChildrenProps, CardData } from '../types/types';
import { ContextTypes } from '../types/types';

const DataContext = createContext<ContextTypes | undefined>(undefined);

const DataContextProvider = ({ value, children }: ChildrenProps) => { 
    
    return (
        
        <DataContext.Provider value={value}>
            { children }
        </DataContext.Provider>
    )
}

export default DataContext;