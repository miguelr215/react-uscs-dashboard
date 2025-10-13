import { Header } from 'components'
import React from 'react'

const Sales = () => {
    return (
        <section>
            <Header title='Sales' description='View Sales & Revenue stats' />
            <p>
                Sales Page content

                Sales last 12 months - line
                month over month sales growth rate - line
                Revenue last 12 months - line
                month over month revenue growth rate - line
                total profit last 12 months - line
                total profit margin last 12 months - line
            </p>
        </section>
    )
}

export default Sales