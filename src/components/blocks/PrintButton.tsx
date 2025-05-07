import { Button } from '../ui/button'
import { Printer } from 'lucide-react'

const PrintButton = (props : any) => {
    return (
        <div className="flex flex-row gap-4 justify-end">
            <Button 
            className='flex flex-row items-center gap-2 bg-indigo-600'
            onClick={(e)=>{ 
                    if(props && props.onClick) {
                        props.onClick(e)
                    }
                 }} 
                >
                <Printer />

                <span>
                    Print
                </span>
            </Button>
        </div>
    )
}

export default PrintButton