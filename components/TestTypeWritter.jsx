import React from 'react'
import Typewriter from 'typewriter-effect';

function TestTypeWritter() {
  return (
      <div>
          {/* <Typewriter
              onInit={(typewriter) => {
                  typewriter.typeString('Hello World!')
                      .callFunction(() => {
                          console.log('String typed out!');
                      })
                      .pauseFor(2500)
                      .deleteAll()
                      .callFunction(() => {
                          console.log('All strings were deleted');
                      })
                      .start();
              }}
          /> */}

          <Typewriter
              options={{
                  strings: ['Welcome', 'User'],
                  autoStart: true,
                  loop: true,
              }}
          />
      </div>
  )
}

export default TestTypeWritter