import React from 'react';
import { Line } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      coefficent: 0,
      heightsArray : [],
      bounces: 0,
      data: {
        labels: [],
        datasets: [
          {
            label: "Height",
            backgroundColor: "rgba(255, 0, 255, 0.75)",
            data: []
          }
        ]
      }
    }
    this.coeffChanged = this.coeffChanged.bind(this);
    this.onHeightChanged = this.onHeightChanged.bind(this);
    this.plotGraph = this.plotGraph.bind(this);
  }

  onHeightChanged(value) {
    console.log(parseInt(value));
    if(value > 0){
      this.setState({
        height: parseInt(value)
      })
    }
    
  }

  plotGraph() {
    console.log(this.state.coefficent, this.state.height)
    if(this.state.coefficent > 0 && this.state.height > 0){
      let data = this.state.data;
      let cor = this.state.coefficent;
      let calculatedHeight = this.state.height;
      let heightArray = [calculatedHeight];
      let timeArray = [0];
      let calculatedTime = 0;
      let bounces = 0;
      while(calculatedHeight > 0.1){
        let timeTakenToFall = Math.sqrt((2*calculatedHeight)/10);
        calculatedTime = calculatedTime + timeTakenToFall;
        timeArray.push(calculatedTime);
        heightArray.push(0);
        bounces = bounces + 1;
        let u = Math.sqrt(2*10*calculatedHeight)
        calculatedHeight = (calculatedHeight*cor*cor).toFixed(1);
        let v = cor*u;
        let t = calculatedHeight /v;
        calculatedTime = calculatedTime+t
        timeArray.push(calculatedTime);
        heightArray.push(calculatedHeight);
      }
      heightArray.push(0);
      let totalTime = Math.sqrt((2*this.state.height)/9.8)*((1+cor)/(1-cor));
      timeArray.push(totalTime);
      data.labels = timeArray;
      data.datasets[0].data = heightArray;
      this.setState({
        data: data,
        bounces: bounces
      })
      
      
    }
    
  }

  coeffChanged(event, value){
    this.setState({
      coefficent: value
    })
    
  }

  valuetext(value) {
    console.log(value)
  }

  render() {
    
    return (
     
      <Box>
        <Grid container>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center">
                <Box  >
                  <TextField 
                            value={this.state.height}
                            variant="outlined"
                            label="Initial height"
                            onChange={(e) => 
                                            {this.onHeightChanged(e.target.value); this.plotGraph()}}/>

                <Typography id="discrete-slider" style ={{marginTop: 50}} gutterBottom>
                    coefficient of restitution
                </Typography>
                  <Slider
                        
                        defaultValue={1}
                        min={0.01}
                        max={1.00}
                        getAriaValueText={this.valuetext}
                        onChange={(event, value) => {this.coeffChanged(event, value); this.plotGraph()}}
                        aria-labelledby="discrete-slider-small-steps"
                        step={0.01}
                        marks
                        valueLabelDisplay="on"
                      />
                    <Button onClick={this.plotGraph}>
                     Plot graph
                    </Button>
                    <Typography  style ={{marginTop: 50}} gutterBottom>
                        Number of bounces: {this.state.bounces}
                    </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
            <Paper elevation={6}
                >  
              <Line 
                   
                    options = {{
                      responsive: true
                    }} 
                    data={this.state.data}      
              />
              </Paper>
            </Grid>
        </Grid>
        
        
      </Box>
    );
  }
}

export default App;
