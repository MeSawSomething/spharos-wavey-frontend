import SectionTitle from '@/components/layouts/SectionTitle'
import Separator from '@/components/ui/Separator'
import style from '@/components/pages/main/SpotRecommend.module.css'
import SpotCards from './SpotCards'


export default function SpotRecommand() {
  return (
    <>
      <Separator gutter={3}/>
      <div className={style.sectionWrap}>

        <SectionTitle>여 가보이소~</SectionTitle>
      </div>
        <Separator gutter={0.7} />
        <div className={style.sectionWrap}>
          {
            <SpotCards />
          }
        </div>
    </>
  )
}
