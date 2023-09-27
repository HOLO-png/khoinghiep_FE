
import { useEffect } from 'react'

import { useLightStore } from 'src/@core/store/light-store'
import { lefOff } from 'src/@core/store/light-store'


function LightAction() {
  const light = useLightStore((s) => s.light)
  const isTurnOn = useLightStore((s) => s.isTurnOn)
  const getLightStatus = useLightStore((s) => s.getLightStatus)

  useEffect(() => {
    getLightStatus()
  }, [getLightStatus, isTurnOn])

  return (
    <section>
      <img defaultValue={lefOff} src={light} id='bulb' width={100} alt='' />
    </section>
  )
}

LightAction.propTypes = {}

export default LightAction
