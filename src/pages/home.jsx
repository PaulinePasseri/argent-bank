import Hero from "../components/Hero/hero"
import Features from "../components/Features/features"
import '../main.css'
import IconChat from '../assets/icon-chat.png'
import IconMoney from '../assets/icon-money.png'
import IconSecurity from '../assets/icon-security.png'

export default function Home() {
    return (
        <main>
            <Hero/>
            <section class="features">
                <h2 class="sr-only">Features</h2>
                <Features
                    picture={IconChat}
                    alt="icon-chat"
                    title="You are our #1 priority"
                    description="Need to talk to a representative? You can get in touch through our
                    24/7 chat or through a phone call in less than 5 minutes."
                />
                <Features
                    picture={IconMoney}
                    alt="icon-money"
                    title="More savings means higher rates"
                    description="The more you save with us, the higher your interest rate will be!"
                />
                <Features
                    picture={IconSecurity}
                    alt="icon-security"
                    title="Security you can trust"
                    description="We use top of the line encryption to make sure your data and money
                    is always safe."
                />
            </section>
        </main>
    )
}