import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({

})

export function useCreateBook() {
    

    const {
        handleSubmit,
        formState: {errors}
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
    })

    const onSubmit = handleSubmit(async () => {

    })

    return {
        onSubmit,
        errors
    }
}