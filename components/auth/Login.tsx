"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/hooks/use-toast"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"

const formSchema = z.object({
  username: 
    z.string()
    .nonempty({ message: 'Username is required' })
    .trim(),
  password: 
    z.string()
    .nonempty({ message: 'Password is required' })
    .trim()
});

const Login = () => {
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState<boolean>(false)

  useEffect(() => {
    if (localStorage.getItem("notification")) {
      const notification = localStorage.getItem("notification") as string
      toast({
        title: notification,
        duration: 3000
      })
      localStorage.removeItem("notification")
    }
  }, [])
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (submitting) return
    setSubmitting(true)

    const formValues = form.getValues()

    // const data = await login(formValues)
    // if (data === undefined || data === null) {
    //   toast({
    //     variant: "destructive",
    //     title: "Invalid username or password, please try again.",
    //   })

    //   setSubmitting(false)
    //   return
    // }

    // window.location.href = "/items"
    // setLogin()
  }

  return (
    <div className="flex flex-col w-[80%] max-w-md min-h-fit px-10 py-8 my-8 bg-lightBlack rounded-lg" data-aos="fade-up">
      {/* Header */}
      <div className="flex justify-center items-center">
        <h1 className="font-extrabold tracking-tight text-4xl text-center text-lightWhite">
          Log in
        </h1>
      </div>

      {/* Inputs */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-[85%] mx-auto mt-5 space-y-7">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lightWhite">Username</FormLabel>
                <FormControl>
                  <Input 
                    className="text-lightWhite placeholder:text-lightWhite border-neutral-600 focus-visible:ring-neutral-600" 
                    placeholder="Enter your username.."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lightWhite">Password</FormLabel>
                <FormControl>
                  <Input 
                    className="text-lightWhite placeholder:text-lightWhite border-neutral-600 focus-visible:ring-neutral-600" 
                    placeholder="Enter your password.."
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center items-center">
            <Button className="lg:w-[25%] bg-red-700 hover:bg-red-600 disabled:bg-gray-500" type="submit" disabled={submitting}>
              {submitting ? "Logging in..." : "Log in"}
            </Button>  
          </div>
        </form>
      </Form>
        
      {!submitting && (
        <p className="mx-auto mt-3 text-center text-sm text-lightWhite">Don&apos;t have an account?
          <Link className="text-white font-semibold" href="/signup"> Sign up</Link>
        </p>
      )}
    </div>
  )
}

export default Login