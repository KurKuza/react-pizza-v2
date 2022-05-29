import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={464}
    viewBox="0 0 280 464"
    backgroundColor="#636363"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="138" cy="136" r="130" /> 
    <rect x="0" y="278" rx="5" ry="5" width="280" height="27" /> 
    <rect x="0" y="319" rx="10" ry="10" width="280" height="88" /> 
    <rect x="125" y="419" rx="28" ry="28" width="152" height="45" /> 
    <rect x="0" y="428" rx="5" ry="5" width="91" height="27" />
  </ContentLoader>
)

export default Skeleton