import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent, SelectGroup } from '@/components/ui/select';
import { ROLES } from '@/constants/roles';
import { getAllUser, updateUser } from '@/features/users/userSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import React, { useState } from 'react'
import { toast } from 'sonner';

const EditUserDialog = ({ user }: { user: any }) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        role: user.role
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleRowChange = (e: string) => {
        setFormData({...formData, role: e})
    }

    const handleSave = async () => {
        try {
            const userId = user._id || user.id;

            if (!userId) {
                toast.error("User not found")
            }
            console.log(userId)
            await dispatch(updateUser({ id: userId, ...formData })).unwrap();
            dispatch(getAllUser());
            setOpen(false);
            toast.success("Update success");
        } catch (error) {
            toast.error("An error has occur")
        }
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild >
                <Button>Edit</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Update user panel</AlertDialogTitle>
                    <AlertDialogDescription className='flex flex-col gap-3'>
                        <span>Email: </span> <Input name='email' value={formData.email} onChange={handleChange} />
                        <span>Username: </span>  <Input name='username' value={formData.username} onChange={handleChange} />
                        <span>Role: </span>   <Select name='role' value={formData.role} onValueChange={handleRowChange}>
                            <SelectTrigger className="w-full max-w-48">
                                <SelectValue placeholder={formData.role}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value={ROLES.ADMIN}>{ROLES.ADMIN}</SelectItem>
                                    <SelectItem value={ROLES.BASIC}>{ROLES.BASIC}</SelectItem>
                                    <SelectItem value={ROLES.PREMIUM}>{ROLES.PREMIUM}</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSave}>Done</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default EditUserDialog