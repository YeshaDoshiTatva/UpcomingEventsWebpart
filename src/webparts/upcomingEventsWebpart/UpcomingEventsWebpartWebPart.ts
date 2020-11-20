import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'UpcomingEventsWebpartWebPartStrings';
import UpcomingEventsWebpart from './components/UpcomingEventsWebpart';
import { IUpcomingEventsWebpartProps } from './components/IUpcomingEventsWebpartProps';

export interface IUpcomingEventsWebpartWebPartProps {
  PropertiesListUrl: string;
  PropertiesDisplayItems: string;
}

export default class UpcomingEventsWebpartWebPart extends BaseClientSideWebPart <IUpcomingEventsWebpartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IUpcomingEventsWebpartProps> = React.createElement(
      UpcomingEventsWebpart,
      {
        ListUrl: this.properties.PropertiesListUrl,
        DisplayItems: this.properties.PropertiesDisplayItems,
        spHttpClient: this.context.spHttpClient,
        Title: "",
        Description: ""
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('PropertiesListUrl', {
                  label: strings.ListURLFieldLabel,
                  value: ""
                }),
                PropertyPaneTextField('PropertiesDisplayItems', {
                  label: strings.DisplayItems,
                  value: "5"
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
