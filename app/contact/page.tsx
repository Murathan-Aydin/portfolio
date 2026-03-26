import { config } from "@/lib/config"
import ContactClient from "./contact-client"

export default function ContactPage() {
    return (
        <ContactClient
            email={config.email}
            phone={config.phone}
            phoneDisplay={config.phoneDisplay}
        />
    )
}
