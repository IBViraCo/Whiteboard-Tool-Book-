import { PEN_STATICS, THEME_NAMES } from './../../../config/config'
import { CircleColorContainer, CircleColorPicker } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDisplay, faTools } from '@fortawesome/free-solid-svg-icons'
import { PEN_ACTION_TYPE } from '../../../config/action_type'
import actionCreator from '../../../actions/actionCreator'
import ThemeContexts from '../../../contexts/ThemeContexts'
import { useEffect } from 'react'
import PenContext from '../../../contexts/PenContext'

import Ellipse from '../../../assets/icons/Ellipse.png'

const ColorToolbar = () => {
  const [theme] = ThemeContexts.useThemeContext()
  const [penState, penDispatch] = PenContext.usePenContext()
  const BlackColor = () => (
    <CircleColorPicker
      onClick={(e) => {
        e.stopPropagation()
        actionCreator(penDispatch, PEN_ACTION_TYPE.COLOR_CHANGE, {
          color: PEN_STATICS.colors.black,
        })
        actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, {
          isActive: true,
        })
      }}
      className={`pointer circle-color-picker pen-color-parent-property black ${
        penState.color === PEN_STATICS.colors.black ? 'active-color-picker' : ''
      }`}
    >
      &nbsp;
    </CircleColorPicker>
  )

  const WhiteColor = () => (
    <CircleColorPicker
      onClick={(e) => {
        e.stopPropagation()

        actionCreator(penDispatch, PEN_ACTION_TYPE.COLOR_CHANGE, {
          color: PEN_STATICS.colors.white,
        })
        actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, {
          isActive: true,
        })
      }}
      className={`pointer circle-color-picker pen-color-parent-property white ${
        penState.color === PEN_STATICS.colors.white ? 'active-color-picker' : ''
      }`}
    >
      &nbsp;
    </CircleColorPicker>
  )

  useEffect(() => {
    if (
      theme === THEME_NAMES.whiteboard &&
      penState.color === PEN_STATICS.colors.white
    )
      actionCreator(penDispatch, PEN_ACTION_TYPE.COLOR_CHANGE, {
        color: PEN_STATICS.colors.black,
      })
  }, [theme])

  return (
    <>
      <CircleColorContainer
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <CircleColorPicker
          onClick={(e) => {
            e.stopPropagation()
            actionCreator(penDispatch, PEN_ACTION_TYPE.COLOR_CHANGE, {
              color: PEN_STATICS.colors.red,
            })
            actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, {
              isActive: true,
            })
          }}
          className={`pointer circle-color-picker pen-color-parent-property red ${
            penState.color === PEN_STATICS.colors.red
              ? 'active-color-picker'
              : ''
          }`}
        >
          &nbsp;
        </CircleColorPicker>

        <CircleColorPicker
          onClick={(e) => {
            e.stopPropagation()

            actionCreator(penDispatch, PEN_ACTION_TYPE.COLOR_CHANGE, {
              color: PEN_STATICS.colors.green,
            })
            actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, {
              isActive: true,
            })
          }}
          className={`pointer circle-color-picker pen-color-parent-property green ${
            penState.color === PEN_STATICS.colors.green
              ? 'active-color-picker'
              : ''
          }`}
        >
          &nbsp;
        </CircleColorPicker>

        <CircleColorPicker
          onClick={(e) => {
            e.stopPropagation()

            actionCreator(penDispatch, PEN_ACTION_TYPE.COLOR_CHANGE, {
              color: PEN_STATICS.colors.blue,
            })
            actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, {
              isActive: true,
            })
          }}
          className={`pointer circle-color-picker pen-color-parent-property blue ${
            penState.color === PEN_STATICS.colors.blue
              ? 'active-color-picker'
              : ''
          }`}
        >
          &nbsp;
        </CircleColorPicker>

        <CircleColorPicker
          onClick={(e) => {
            e.stopPropagation()
          }}
          onChange={(e) => {
            actionCreator(penDispatch, PEN_ACTION_TYPE.COLOR_CHANGE, {
              color: e.target.value,
            })
            actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, {
              isActive: true,
            })
        
          }}
        >
          <label
            htmlFor="color_pallette"
            style={{
              width: '1.6rem',
              height: '1.6rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={Ellipse} />
          </label>

          <input
            type="color"
            id="color_pallette"
            style={{
              cursor: 'pointer',
              width: '1.6rem',
              height: '1.6rem',
              opacity: '0',
              position: 'absolute',
              top: '0%',
              left: '0%',
            }}
          />
          {/* <img src={Ellipse}  /> */}
        </CircleColorPicker>

        <CircleColorPicker
          onClick={(e) => {
            e.stopPropagation()

            actionCreator(penDispatch, PEN_ACTION_TYPE.COLOR_CHANGE, {
              color: PEN_STATICS.colors.yellow,
            })
            actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, {
              isActive: true,
            })
          }}
          className={`pointer circle-color-picker pen-color-parent-property yellow ${
            penState.color === PEN_STATICS.colors.yellow
              ? 'active-color-picker'
              : ''
          }`}
        >
          &nbsp;
        </CircleColorPicker>

        <BlackColor />

        <div>
          <input
            type="range"
            onChange={(e) => {
              actionCreator(penDispatch, PEN_ACTION_TYPE.SIZE_CHANGE, {
                size: PEN_STATICS.sizes[e.target.value],
              })
              actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, {
                isActive: true,
              })
            }}
            min={1}
            max={3}
            defaultValue={2}
            style={{ direction: 'ltr', marginTop: '1rem' }}
          />
        </div>

        {/* {theme !== THEME_NAMES.whiteboard ? <WhiteColor /> : ''} */}

        {/* <span
                onClick={() => setToolbar('main') }  
                id="tools-chooser" 
                className="pointer circle-choose-sizes-button d-flex flex-column align-items-center pt-2" 
                data-buton-type="size"
                >
                <FontAwesomeIcon icon={faTools}/>
                ابزار             
            </span> */}

      
      </CircleColorContainer>
    </>
  )
}

export default ColorToolbar
