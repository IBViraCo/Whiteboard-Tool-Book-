import { CircleColorPicker } from '../../component/sidebar/PenIcon/style'
import { CircleColorContainer } from '../../component/sidebar/PenIcon/style'
import line from '../../assets/icons/Line 1.svg'
import arrow from '../../assets/icons/Arrow 1.svg'
import star from '../../assets/icons/Star 1.svg'
import circle from '../../assets/icons/circle.svg'
import square from '../../assets/icons/Square.svg'
import triangle from '../../assets/icons/triangle.svg'
import configForCreateCircle from '../../helper/shape'


const DetailModalsShape = ({
  circles,
  Circle
}) => {
  return (
    <>
      <CircleColorContainer
      onContextMenu={(e)=>{
        e.preventDefault()
        e.stopPropagation()}}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <CircleColorPicker
          onClick={(e) => {
            e.stopPropagation()
        
          }}
        >
          <img src={triangle}/>
        </CircleColorPicker>

          <div id='my-create'>
        <CircleColorPicker
        
          onClick={(e) => {
            
            e.stopPropagation()
              const newCircle =   new Circle(350, 350 ,50 , 'white' , 'black')
              circles.push(newCircle)
                newCircle.draw()
          }}
        >
          <img src={circle}/>
        </CircleColorPicker>

          </div>

        <CircleColorPicker
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <img src={square}/>
        </CircleColorPicker>

        <CircleColorPicker
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <img src={star}/>
        </CircleColorPicker>

        <CircleColorPicker
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <img src={arrow}/>
        </CircleColorPicker>

        <CircleColorPicker
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <img src={line}/>
        </CircleColorPicker>
      </CircleColorContainer>
    </>
  )
}
export default configForCreateCircle(DetailModalsShape)
