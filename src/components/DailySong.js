import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TrapApiError, WidgetHeader, WidgetLoader, Widget, WidgetBody, WidgetAvatar } from '@mozaik/ui';
import FaPlayCircleO from 'react-icons/lib/fa/play-circle-o';

const request = require('request-promise-native')

export default class DailySong extends Component {
    static PropTypes = {
        title: PropTypes.string,
        channel: PropTypes.string.isRequired,
        playing: PropTypes.bool,
        apiData: PropTypes.shape({
            DailySong: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
        }),
        apiError: PropTypes.object,
    }

    constructor(props) {
        super(props);

        this.play = this.play.bind(this);
    }

    static getApiRequest({ channel }) {
        console.log('channel', channel);
        return {
            id: `slack.dailySong`,
            params: { channel }
        }
    }

    static defaultProps = {
        playing: false
    }

    getHtml(html) {
        return {__html: html};
    }

    play() {
        this.props.playing = true;
        this.setState();
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('update component', this.props.apiData, (!this.props.apiData));
        return !this.props.apiData
        || this.props.playing
        || nextProps.apiData.ts != this.props.apiData.ts;
    }

    componentDidUpdate() {
        this.props.playing = false;
    }

    render() {
        const { apiData, apiError, title } = this.props;

        let body;
        let songTitle = "";
        let videoBody;
        if (apiData) {
            const video = apiData.attachments[0];
            songTitle = (video) ? " - " + video.title : "";
            if (!this.props.playing) {
                videoBody = (
                    <div className="thumb">
                        <img src={ video.thumb_url } alt={ video.title } width={ video.thumb_width } height={ video.thumb_height }/>
                        <a className="play-icon" onClick={this.play}><FaPlayCircleO /></a>
                    </div>
                )
            } else if (this.props.playing){
                videoBody = (
                    <div id="video" dangerouslySetInnerHTML={ this.getHtml(video.video_html) }>
                    </div>
                )
            }
        } else {
            videoBody = (
                <div className="noSong">
                    <p>Envoyez le son du jour sur le channel entre-nous</p>
                </div>
            )
        }
        body = (
            <div id="slack">
                <div id="sonDuJour">
                    {videoBody}
                </div>
            </div>
        )

        return (
            <Widget>
                <WidgetHeader
                    title={(title || 'Le son du jour') + songTitle}
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        {body}
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
