import { useState } from "react";

export default function useForm() {
    // The form open state
    const [formOpen, setOpen] = useState(false);

    // Functions to handle form state
    const openForm = () => setOpen(true);
    const closeForm = () => setOpen(false);

    return {
        formOpen,
        openForm,
        closeForm
    };
}