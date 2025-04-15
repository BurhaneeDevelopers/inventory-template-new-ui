import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

export function FormModal({ children }) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>New Purchase Order</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-screen-xl max-h-[90vh] overflow-y-auto">
                <div>
                    <DialogHeader>
                        <DialogTitle>Create Purchase Order</DialogTitle>
                        <DialogDescription>Fill in all the details below.</DialogDescription>
                    </DialogHeader>

                    {/* --- 1. Purchase Order Details --- */}
                    <div className="my-4 mb-7 font-semibold text-lg">Purchase Order Details</div>

                    {/* FORM CHILDREN HERE  */}
                    <div className="">
                        {children}
                    </div>

                    <DialogFooter className="mt-6">
                        <Button type="submit">Save Purchase Order</Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}
