import { Button } from '../ui/button'
import { Printer } from 'lucide-react'

const PrintButton = () => {
    return (
        <div className="flex flex-row gap-4 justify-end">
            <Button className='flex flex-row items-center gap-2 bg-indigo-600'>
                <Printer />

                <span>
                    Print
                </span>
            </Button>
        </div>
    )
}

export default PrintButton