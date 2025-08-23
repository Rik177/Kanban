import { createContext } from 'react'; 
import { ChildrenProps, ContextTypes } from '../types/types';

const DataContext = createContext<ContextTypes | undefined>(undefined);

export const DataContextProvider = ({ value, children }: ChildrenProps) => { 
    
    return (
        
        <DataContext.Provider value={value}>
            { children }
        </DataContext.Provider>
    )
}

export default DataContext;