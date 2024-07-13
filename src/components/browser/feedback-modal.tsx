"use client"

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";

import {
    Form,
    FormItem,
    FormField,
    FormLabel,
    FormMessage,
    FormControl,
} from "@/components/ui/form";
import {
    Dialog,
    DialogTitle,
    DialogHeader,
    DialogTrigger,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().includes("@"),
    pageIssue: z.string().min(2),
    message: z.string().min(2),
});

export const FeedbackModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            pageIssue: "",
            message: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {




            setIsOpen(false);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: ``,
                variant: "default",
            })
        }
    }
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open)
                form.reset();
            }}
        >
            <DialogTrigger asChild>
                <Button type="button" size="sm" className="w-full bg-app-color hover:bg-app-color/80 text-neutral-100 translate-hover">
                    Share Your Feedback
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-full dark:bg-neutral-950 dark:border-white/[0.2] bg-neutral-100 border-black/[0.2]">
                <DialogHeader>
                    <DialogTitle className="dark:text-neutral-200 text-neutral-800 capitalize"></DialogTitle>
                    <DialogDescription className="dark:text-neutral-400 text-neutral-600">Keep track of important details and decisions.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Enter your name..."
                                            className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="Enter your name..."
                                            className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pageIssue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Page Issue</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="Where did the issue occured? ex: (builder, tracker, feeds)"
                                            className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Explain the what happened..."
                                            className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-x-2 mt-2">
                            <Button
                                size="sm"
                                type="button"
                                variant="ghost"
                                disabled={isLoading}
                                className="translate-hover"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="sm"
                                disabled={isLoading}
                                className="bg-app-color hover:bg-app-color/80 text-neutral-100 translate-hover"
                            >
                                {isLoading ? (
                                    <p className="flex items-center gap-x-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Loading...
                                    </p>
                                ) : (
                                    <p>Send</p>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}