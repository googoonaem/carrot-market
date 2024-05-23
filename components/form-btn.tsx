"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
    text: string
}

export default function FormButton ({text}: FormButtonProps) {
    const {pending} = useFormStatus();
    return (
        <button disabled={pending}
            className="primary-btn py-2.5 text-lg disabled:cursor-not-allowed disabled:text-neutral-300 disabled:bg-neutral-400">
            {pending? "로딩중..." :text}
        </button>
    );
}