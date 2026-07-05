'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';
import { toast } from "sonner"
import axios, { AxiosError } from 'axios';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from "next/navigation";


/// route : 3000/sign-in
const page = () => {
    const [username, SetUsername] = useState('');
    // const debounced = useDebounceCallback(SetUsername, 2000); /// for using debounceCallback setUsername get it's value after 2sc. Using debounced('value'). on every change in debounced setUsername get it's value in 2sc delay
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();


    const signUpSchema = z.object({
        name: z.string().min(3, "Minimum 3 character require"),
        email: z.string().email("Enter a valid email"),
        password: z.string().min(6, "Password must be 6 character")
    });
    type formSchema = z.infer<typeof signUpSchema>;
    const form = useForm<formSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });




    const onSubmit = async (data: formSchema) => {
        if (isSubmitting) {
            return toast.warning("wait")
        }
        setIsSubmitting(true);
        try {
            const res = await axios.post('/api/sign-up', data);
            if (res.data.success) {
                toast.success(res.data.message);
                // router.replace(`/verify/${data.email}`);
            }
            // console.log(res.data)
        } catch (error) {
            const apiError: any = error as AxiosError;
            console.log("User name checking error", apiError.response?.data.message ?? "error");
            setErrorMessage(apiError.response?.data.message ?? "Something unexpected error")
            // toast.error(apiError.response?.data.message ?? "error");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <div className='w-full h-screen flex items-center justify-center'>
                <div className='w-full h-full md:h-auto max-w-md rounded-2xl pt-16 md:p-6 p-4  shadow-xl border'>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <h1 className='mb-4 text-2xl font-bold text-center'>Sign up</h1>
                        <FieldSet>
                            <FieldLegend>Please signup</FieldLegend>
                            <FieldDescription>Enter all the details for registration</FieldDescription>

                            <FieldGroup>

                                <Controller name='name' control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor='name'>Enter username</FieldLabel>
                                            <Input {...field} id='name'
                                                placeholder='Susanta Samanta'
                                                aria-invalid={fieldState.invalid}
                                            />

                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

                                        </Field>
                                    )}
                                />


                                <Controller name='email' control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor='email'>Enter email</FieldLabel>
                                            <Input {...field} id='email'
                                                placeholder='susanta@gmail.com'
                                                aria-invalid={fieldState.invalid}
                                                onChange={(e) => {
                                                    setErrorMessage('')
                                                    field.onChange(e);
                                                }}
                                            />
                                            {errorMessage ?
                                                <p className={`text-[14px] tracking-tight text-red-600`}>
                                                    {errorMessage}
                                                </p>
                                                :
                                                fieldState.invalid && <FieldError errors={[fieldState.error]} />
                                            }
                                        </Field>
                                    )}
                                />


                                <Controller name='password' control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor='password'>Password</FieldLabel>
                                            <Input {...field} id='password'
                                                type='password'
                                                placeholder='•••••••'
                                                aria-invalid={fieldState.invalid}
                                            />

                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                        </FieldSet>
                        <Field>
                            <Button type='submit'
                                disabled={isSubmitting}
                                className={`my-6 w-full py-5 disabled:bg-slate-500 disabled:cursor-not-allowed cursor-pointer`}>
                                {isSubmitting && <Loader2 className='animate-spin' />}Sign up
                            </Button>
                        </Field>

                        <p className='text-center text-sm'>Already have account
                            <Link href={'/sign-in'} className='text-blue-700'> Login</Link>
                        </p>

                    </form>


                </div>
            </div >

        </>
    )
}

export default page