import React from 'react'
import NextImage from 'next/image'
import { BRAND_LOGO_PATH } from '@/utils/constants'


const BrandLogo = () => {
  return (
    <NextImage src={BRAND_LOGO_PATH} width={180} height={120}/>
  )
}

export default BrandLogo
