
import UAEFormationHero from "../Components/UAEFormationHero";
import WhyChooseUAE from "../Components/WhyChooseUAE";
import UAEFormationProcess from "../Components/UAEFormationProcess";
import UAEJurisdiction from "../Components/UAEJurisdiction";
import UAEFreeZoneBenefits from "../Components/UAEFreeZoneBenefits";
import UAEAchievements from "../Components/UAEAchievements";
import UAEFormationFAQ from "../Components/UAEFormationFAQ";
import UAEFormationCTA from "../Components/UAEFormationCTA";
import UAEFormationFooter from "../Components/UAEFormationFooter";
import UAEFormationHeader from "../Components/UAEFormationHeader";

export default function Home() {
    return (
        <>
            {/* <div style={{ position: 'sticky', top: '0', zIndex: '1000' }}>
                <HeaderDesignV1 />
            </div> */}
            <UAEFormationHeader />
            <UAEFormationHero />
            <WhyChooseUAE />
            <UAEFormationProcess />
            <UAEJurisdiction />
            <UAEFreeZoneBenefits />
            <UAEAchievements />
            <UAEFormationFAQ />
            <UAEFormationCTA />
            <UAEFormationFooter />
        </>
    )
}