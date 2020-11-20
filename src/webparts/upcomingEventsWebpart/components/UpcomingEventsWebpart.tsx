import * as React from 'react';
import styles from './UpcomingEventsWebpart.module.scss';
import { IUpcomingEventsWebpartProps } from './IUpcomingEventsWebpartProps';
import { escape, fromPairs } from '@microsoft/sp-lodash-subset';
import { IUpcomingEventsWebpartState } from './IUpcomingEventsWebpartState';
import { IUpcomingEventsItems } from '../Models/IUpcomingEventsItems';
import { SPHttpClient, SPHttpClientResponse} from '@microsoft/sp-http';
import { IUpcomingEventsWebpartWebPartProps } from '../UpcomingEventsWebpartWebPart';
import * as strings from 'UpcomingEventsWebpartWebPartStrings';
import {Icon} from 'office-ui-fabric-react';
//var moment = require("moment");
import * as moment from 'moment';

export default class UpcomingEventsWebpart extends React.Component<IUpcomingEventsWebpartProps, IUpcomingEventsWebpartState> {

  constructor(props: IUpcomingEventsWebpartProps){
    super(props);

    this.state = {
      CalendarItems : [],
      ListURL: this.props.ListUrl   
    }
  }

  private lstCalendarItem : IUpcomingEventsItems[];

  componentDidMount = () => {
    ///<summary>On load event.</summary>
    this.getListItems();
  };

  componentDidUpdate = (prevProps) => {
    ///<summary>Event called when any states is changed.</summary>
    ///<param name="prevProps">Previous Properties values</param>
    if((prevProps.ListUrl !== this.props.ListUrl) && (this.props.ListUrl !== undefined || this.props.ListUrl !== null || this.props.ListUrl.trim() !== "")){
      this.getListItems();
    }

    if(prevProps.DisplayItems !== this.props.DisplayItems){
      this.getListItems();
    }
  };

  getListItems = () => {
    ///<summary>Get items from the list.</summary>
    const messageDiv = document.querySelector("#divMessage");
    let noOfItems = 5;
    if (!isNaN(Number(this.props.DisplayItems)) && Number(this.props.DisplayItems) > 0) {
      noOfItems = Number(this.props.DisplayItems);
    }
    else if(this.props.DisplayItems !== undefined && (isNaN(Number(this.props.DisplayItems))) || (!isNaN(Number(this.props.DisplayItems)) && Number(this.props.DisplayItems) <= 0)){
      messageDiv.innerHTML = strings.DisplayItemsMessage;
      this.setState({CalendarItems: []});
      return;
    }
    
    try{
    if(this.props.ListUrl !== undefined){
      let strListURLString = this.props.ListUrl;
      let strCurrentURL = new URL(strListURLString);
      let strListAbsoluteURL = strListURLString.substr(0, strListURLString.lastIndexOf('/Lists/'));
      let strListPathName = strCurrentURL.pathname;
      let todayDate = new Date().toISOString();
      
      this.props.spHttpClient.get(strListAbsoluteURL+"/_api/Web/GetList('"+strListPathName+"')/items?$select=ID,Title,Description,EventDate&$top="+noOfItems+"&$filter=EventDate ge '"+todayDate+"'", SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        if(response.ok){
          response.json().then((responseJSON) => {
            this.lstCalendarItem = responseJSON.value;
            if(this.lstCalendarItem != null && this.lstCalendarItem.length > 0){
               const messageDiv = document.querySelector("#divMessage");
               messageDiv.innerHTML = "";
               this.setState({CalendarItems: this.lstCalendarItem});
            }
            else if(this.lstCalendarItem.length === 0){
              const messageDiv = document.querySelector("#divMessage");
              messageDiv.innerHTML = strings.NoItemFoundMessage;
              this.setState({CalendarItems: []});
            }
          });
        }
        else{
          messageDiv.innerHTML = strings.NoItemFoundMessage;
          this.setState({CalendarItems: []});
        }
      }).catch((error) => {
        console.log("Error in getListItems 1 ---->",error);
      });
    }
    else{
      messageDiv.innerHTML = strings.PropertiesMessage;
      this.setState({CalendarItems: []});
    }
  }
  catch(error){
    console.log("Error in getListItems 2 ---->",error);
    messageDiv.innerHTML = strings.PropertiesMessage;
    this.setState({CalendarItems: []});
  }
  }

  public render(): React.ReactElement<IUpcomingEventsWebpartProps> {
    ///<summary>Render method.</summary>
    return (
      <div className={ styles.upcomingEventsWebpart }>
          <div className={styles.clsMain}>
            <div className={styles.clsDivHeading}>
            <Icon iconName="Event" id={styles.icon} className='ms-Icon'/>
              <p className={styles.clsHeading}>Upcoming Events</p>
            </div>
            <p id="divMessage" className={styles.clsMessage}></p>
            
            <div className="clsEvents">
                {this.state.CalendarItems.map(item => (
                  <div className={styles.msGridcol}>
                    <Icon iconName="EventInfo" id={styles.clsIcon} className="ms-Icon"/>
                     <h3><a target="_blank" href={this.props.ListUrl+'/DispForm.aspx?ID='+item.ID} className={styles.clsLink}>{item.Title}</a></h3>
                     <p>{moment(item.EventDate).format('DD/MM/yyyy')}</p>
                     <p>{item.Description != null && item.Description.length > 0 ? item.Description.replace(/<[^>]+>/g, '') : ''}</p>
                  </div>
                ))}
            </div>
          </div>
      </div>
    );
  }
}
