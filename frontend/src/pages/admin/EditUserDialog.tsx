import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { getAllUser, updateUser } from '@/features/users/userSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';
import React, { useState } from 'react'
import { toast } from 'sonner';

const EditUserDialog = ({user} : {user : any}) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        role: user.role
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleSave = async () => {
        try {
            await dispatch(updateUser({id: user.id, ...formData}));

            dispatch(getAllUser());
            setOpen(false);
            toast.success("Update success");
        } catch (error) {
            toast.error("An error has occur")
        }
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button>Edit</Button>
        </DialogTrigger>

        <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User: {user.username}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Username</Label>
            <Input name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div className="grid gap-2">
             <Label>Email</Label>
             <Input name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="grid gap-2">
             <Label>Role</Label>
             <Input name="role" value={formData.role} onChange={handleChange} />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditUserDialog