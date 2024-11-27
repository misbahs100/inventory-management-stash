"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { addCategory } from "@/actions/inventory/categories"
import {
  categorySchema,
  type AddCategoryFormInput,
} from "@/validations/inventory"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"

export function AddCategoryForm(): JSX.Element {
  const { toast } = useToast()
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<AddCategoryFormInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  function onSubmit(formData: AddCategoryFormInput) {
    startTransition(async () => {
      try {
        const message = await addCategory({
          name: formData.name,
          description: formData.description,
        })

        switch (message) {
          case "exists":
            toast({
              title: "This category already exists",
              description: "Please use a different name",
              variant: "destructive",
            })
            break
          case "success":
            toast({
              title: "Success!",
              description: "New category added",
            })
            router.push("/app/inventory/categories")
            router.refresh()
            break
          default:
            toast({
              title: "Error adding new category",
              description: "Please try again",
              variant: "destructive",
            })
        }
      } catch (error) {
        toast({
          title: "Something wend wrong",
          description: "Please try again",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full md:w-2/3">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Category name" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full md:w-2/3">
              <FormLabel>Description</FormLabel>

              <FormControl className="min-h-[120px]">
                <Textarea
                  placeholder="Category description (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <div className=" flex items-center gap-2 pt-2">
          <Button
            disabled={isPending}
            aria-label="Add Category"
            className="w-fit"
          >
            {isPending ? (
              <>
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
                <span>Adding...</span>
              </>
            ) : (
              <span>Add Category</span>
            )}
            <span className="sr-only">Add Category</span>
          </Button>

          <Link
            href="/app/inventory/categories"
            className={cn(buttonVariants({ variant: "ghost" }), "w-fit")}
          >
            Cancel
          </Link>
        </div>
      </form>
    </Form>
  )
}
