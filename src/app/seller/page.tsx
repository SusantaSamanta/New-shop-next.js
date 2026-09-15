"use client";

import React, { useEffect, useState } from "react";

const code = `> npm run dev Starting development server... ✓ Compiled successfully Local: http://localhost:5173 Network: http://192.168.1.10:5173 Watching for file changes... > Ready to build something amazing... 
npm run dev Starting development server... ✓ Compiled successfully Local: http://localhost:5173 Network: http://192.168.1.10:5173 Watching for file changes... > Ready to build something amazing... 
npm run dev Starting development server... ✓ Compiled successfully Local: http://localhost:5173 Network: http://192.168.1.10:5173 Watching for file changes... > Ready to build something amazing... `;

// const code = `sayan samanta Susanta Samanta Sumana Suman`;


const co = `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useState } from "react";
import axios from "axios";
export default function CategoryForm({isEdit, } : {isEdit?: boolean}) {
    const [nameErrorMess, setNameErrorMess] = useState('');
    const [slugErrorMess, setSlugErrorMess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const categorySchema = z.object({
        name: z.string().min(3, "Minimum 3 characters required"),
        slug: z.string().min(3, "Minimum 3 characters required"),
        description: z.union([
            z.literal(""),
            z.string().min(10, "Description must be at least 10 characters"),
        ]),
        image: z
            .url("Image URL is required")
            .or(z.literal(""))
            .optional(),
        isActive: z.boolean().default(true),
    });
    type FormSchema = z.infer<typeof categorySchema>;
    const form = useForm<FormSchema>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            slug: "",
            description: "",
            image: "",
            isActive: true,
        },
    });
`


const Page = () => {
  return (
    <div className="min-h-screen relative flex items-center  bg-black">
      <Terminal />
    </div>
  );
};

export default Page;

const Terminal = () => {
  const [text, setText] = useState("");
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let reset: ReturnType<typeof setTimeout>;
    let index = 1;

    interval = setInterval(() => {
      setText(co.slice(0, index));
      index++;
      if (index > co.length) {
        clearInterval(interval);
        reset = setTimeout(() => {
          setText("");
          setRunId((r) => r + 1);
        }, 200);
      }
    }, 10);

    return () => {
      clearInterval(interval);
      clearTimeout(reset);
    };
  }, [runId]);

  return (
    <div className="w-200 h-screen rounded-lg p-4 overflow-hidden font-mono text-green-600">
      <pre className="whitespace-pre-wrap text-left text-md leading-">
        {text}
        <span className="animate-pulse">▋</span>
      </pre>
      <div className="w-screen h-screen backdrop-blur-[3px] absolute top-0 left-0 flex items-center justify-center">
        <span className="text-center text-white font-sans text-2xl font-bold">In Development</span>
      </div>
    </div>
  );
};