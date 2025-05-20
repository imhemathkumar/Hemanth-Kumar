"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Facebook, Github, Linkedin, Mail, MapPin, Phone, Send, Twitter, X } from "lucide-react"
import { Button } from "./ui/button"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import MagneticElement from "./magnetic-element"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success!",
          description: "Thank you for your message. I'll get back to you soon.",
        })
        form.reset()
      } else {
        throw new Error(data.error || "Failed to send message")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="contact" className="py-20">
      <div className="lg:container md:container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary">Get in Touch</span>
          <h2 className="text-3xl font-bold mt-1 mb-4">Contact Me</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Feel free to reach out to me for any inquiries, collaborations, or just to say hello. I'll get back to you
            as soon as possible.
          </p>
        </motion.div>
        <div className="flex flex-wrap -mx-4">
          {/* Left Column - Contact Info */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:pt-0 md:pt-6 pt-6 lg:w-1/3 px-4 lg:order-first order-last mb-8 lg:mb-0"
          >
            <Card className="dark:bg-transparent bg-white rounded-lg overflow-hidden shadow-xl">
              <CardContent className="p-6">
                {/* mobile view - Contact Info */}
                <div className="w-full px-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Location:</h3> 
                      <p className="text-sm text-muted-foreground mb-2">Based in</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        {isMobile ? (
                          <a
                            href="https://www.google.com/maps/place/Chennai,+Tamil+Nadu,+India"
                            className="text-primary hover:underline"
                          >
                            Chennai, India
                          </a>
                        ) : (
                          <MagneticElement
                            as="a"
                            href="https://www.google.com/maps/place/Chennai,+Tamil+Nadu,+India"
                            className="text-primary lg:pt-0 pt-3 hover:underline"
                          >
                            Chennai, India
                          </MagneticElement>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-4">Phone</h3>
                      <p className="text-sm text-muted-foreground mb-2">Call me directly</p>
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-primary" />
                        {isMobile ? (
                          <a href="tel:+91 9392961094" className="text-primary hover:underline">
                            +91 9392961094
                          </a>
                        ) : (
                          <MagneticElement
                            as="a"
                            href="tel:+91 9392961094"
                            className="text-primary lg:pt-0 pt-3 hover:underline"
                          >
                            +91 9392961094
                          </MagneticElement>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-xl mb-4">Email</h3>
                      <p className="text-sm text-muted-foreground mb-2">Feel free to email me</p>
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-primary" />
                        {isMobile ? (
                          <a href="mailto:hemanthkumartelukuntla143@gmail.com" className="text-primary hover:underline break-all">
                            hemanthkumartelukuntla143@gmail.com
                          </a>
                        ) : (
                          <MagneticElement
                            as="a"
                            href="mailto:hemanthkumartelukuntla143@gmail.com"
                            className="text-primary lg:pt-0 pt-2 hover:underline"
                          >
                            hemanthkumartelukuntla143@gmail.com
                          </MagneticElement>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4">SOCIALS</h3>
                      <div className="flex space-x-6">
                        <MagneticElement as="div" strength={40}>
                          <a
                            href="https://www.facebook.com/hemanth.telukuntla.96/"
                            className="p-2 border-2 rounded-full hover:bg-primary hover:text-white transition-colors inline-block"
                          >
                            <Facebook className="h-6 w-6 text-primary hover:text-white" />
                          </a>
                        </MagneticElement>
                        <MagneticElement as="div" strength={40}>
                          <a
                            href="https://x.com/i/flow/login?redirect_after_login=%2Fimhemanthkumar8"
                            className="p-2 border-2 rounded-full hover:bg-primary hover:text-white transition-colors inline-block"
                          >
                            <X className="h-6 w-6 text-primary hover:text-white" />
                          </a>
                        </MagneticElement>
                        <MagneticElement as="div" strength={40}>
                          <a
                            href="https://www.linkedin.com/in/hemanth-kumar-telukuntla-14a8572b3/"
                            className="p-2 border-2 rounded-full hover:bg-primary hover:text-white transition-colors inline-block"
                          >
                            <Linkedin className="h-6 w-6 text-primary hover:text-white" />
                          </a>
                        </MagneticElement>
                        <MagneticElement as="div" strength={40}>
                          <a
                            href="https://github.com/imhemathkumar"
                            className="p-2 border-2 rounded-full hover:bg-primary hover:text-white transition-colors inline-block"
                          >
                            <Github className="h-6 w-6 text-primary hover:text-white" />
                          </a>
                        </MagneticElement>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div variants={itemVariants} className="w-full lg:w-2/3 px-4">
            <Card className="dark:bg-transparent bg-white rounded-lg overflow-hidden shadow-xl">
              <CardContent className="p-6">
                {formError && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{formError}</AlertDescription>
                  </Alert>
                )}

                <Form {...form}>
                  <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>FULL NAME</FormLabel>
                            <FormControl>
                              <Input placeholder="Steve Milner" {...field} className="min-h-[44px]" />
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
                            <FormLabel>EMAIL ADDRESS</FormLabel>
                            <FormControl>
                              <Input placeholder="hello@websitename.com" {...field} className="min-h-[44px]" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SUBJECT</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Subject" {...field} className="min-h-[44px]" />
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
                          <FormLabel>YOUR MESSAGE</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Write Your message"
                              className="min-h-[150px] resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <MagneticElement as="div" strength={30}>
                      <Button 
                      type="submit" 
                      className="w-full min-h-[44px]" 
                      disabled={isSubmitting} 
                      onClick={form.handleSubmit(async (data) => {
                        setIsSubmitting(true);
                        try {
                        const formData = new FormData();
                        Object.entries(data).forEach(([key, value]) => {
                          formData.append(key, value);
                        });

                        const response = await fetch("/api/send", {
                          method: "POST",
                          body: formData,
                        });

                        const responseData = await response.json();

                        if (responseData.success) {
                          toast({
                          title: "Success!",
                          description: "Thank you for your message. I'll get back to you soon.",
                          });
                          form.reset();
                        } else {
                          throw new Error(responseData.error || "Failed to send message");
                        }
                        } catch (error) {
                        toast({
                          variant: "destructive",
                          title: "Error",
                          description: error instanceof Error ? error.message : "Failed to send message",
                        });
                        } finally {
                        setIsSubmitting(false);
                        }
                      })}
                      >
                      <motion.div>
                        {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                          </svg>
                          Sending...
                        </span>
                        ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Send Message
                        </span>
                        )}
                      </motion.div>
                      </Button>
                    </MagneticElement>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
