import { FC, ReactNode, useEffect } from "react"
import { useLocation } from "react-router-dom"

type Props = {
    children: ReactNode;
}
const ScrollToTop: FC<Props> = (props) => {
  const { pathname } = useLocation()
  const { children } = props

  useEffect(()=> {
        window.scrollTo(0, 0);
  }, [pathname])
  
  return <>{children}</>;
}

export default ScrollToTop