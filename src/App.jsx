import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CSS_COLOR_NAMES } from './colours'

function App() {

  const flexSizes = [1, 2, 3, 4, 5, 6]

  const [hidden, setHidden] = useState(true)
  const [active, setActive] = useState();

  const [mHeight, setMHeight] = useState()
  const [mWidth, setMWidth] = useState()
  const [nums, setNums] = useState([]);

  useEffect(() => {
    setMWidth(document.querySelector(".modal").clientWidth);
    setMHeight(document.querySelector(".modal").clientHeight)
  }, [active])


  useEffect(() => {

    let nums = ([...Array(24).keys()]
      .map(d => d + 1)
      .sort(() => Math.random() - 0.5)
      .map(n => ({
        num: n,
        flexBasis: flexSizes[Math.floor(Math.random() * flexSizes.length)],
        fontSize: flexSizes[Math.floor(Math.random() * flexSizes.length)] + "vh",
        backgroundColor: Object.values(CSS_COLOR_NAMES)[Math.floor(Math.random() * Object.values(CSS_COLOR_NAMES).length)],
        margin: flexSizes[Math.floor(Math.random() * flexSizes.length)] * 2,
      })));

    setNums(nums)

  }, []);

  return (
    <>
      <div className='container' key="container">
        {nums.map(o =>
          <div id={`door-${o.num}`} className='door' key={o.num}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              ...o
            }}

            onClick={e => {
              let clicked = e.target.textContent;
              let today = new Date().getDate();

              if (clicked > today) {
                window.alert("You're too early!! Don't be a sneak 😤😤😤")
              } else {
                setHidden(false)
                setActive(o.num)
                document.querySelector(`#door-${o.num}`).style.opacity = "0"
              }
            }}
          >
            <p>
              {o.num}
            </p>
          </div>)}
      </div>
      <>
        <div className='modal'
          hidden={hidden}
          style={{
            width: "90vw",
            height: "90vh",

            position: "absolute",
            top: "5vh"
          }}
          onClick={() => setHidden(true)}
        >{(() => {
          return active !== 24
            ? <img key={active} style={{
              height: "100%",
              width: "100%",
            }} src={`https://placebear.com/${mWidth}/${mHeight - active}` + ("#" + active)} />
            : <img key={active} style={{
              width: "100%",
            }} src="https://shop.design-museum.de/cdn/shop/products/miniatur-lcw-628066_1024x1024@2x.jpg?v=1636459118" />
        })()}
        </div>
      </>
    </>
  )
}

export default App
