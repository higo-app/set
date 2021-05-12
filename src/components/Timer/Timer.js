import React from 'react'

class TimerModule extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            diference: null,
            startTime: Date.now(),
        }
        this.updateTime = this.updateTime.bind(this)
    }

    interval = null

    componentDidMount() {
        let callback = () => {
            this.interval = setInterval(this.updateTime, 1000)
        }
        this.setState({
            startTime: Date.now(),
        }, callback)
    }

    updateTime() {
        let time = (Date.now() - this.state.startTime)
        let callback = () => {
            if(this.props.setTime){
                this.props.setTime(time)
            }
        }
        this.setState({
            diference:  time
        }, callback)
    }

    componentWillUnmount() {
        clearInterval()
    }

    render() {
        const { diference } = this.state;
        let seconds = ("0" + (Math.floor(diference / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(diference / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(diference / 3600000)).slice(-2);
        return (
            <>
                <div className="column is-full">
                    <div className="columns">
                        <div className="column">
                            {
                                this.props.name
                            }
                        </div>
                        <div className="column">
                            {hours} : {minutes} : {seconds}
                        </div>
                        <div className="column">
                            {
                                this.props.taps
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default TimerModule