import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import {getTrackInfo} from '../actions/main'

const Main = ({ getTrackInfo, info:{status, message, data}, trackID, auth:{isAuthenticated, user} }) => {
    const [trackNumber, setTrackNumber] = useState('');
    const onSubmit = e => {
        e.preventDefault();
        getTrackInfo(trackNumber, isAuthenticated, user._id);
    };

    return (
        <Fragment>
            <form className= 'form' onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input type="text"
                       name="trackNumber"
                        onChange={e => setTrackNumber(e.target.value)}
                       value={trackNumber}
                       required
                />
                </div>
                <input className= 'btn btn-primary' type="submit" value="Check"/>
            </form>

            {
                status !== null && status === 'error' &&
                    <Fragment><h3>TrackID: {trackID}</h3> <br/> Ошибка: {message}</Fragment>
            }
            {status !== null && status === 'ok' &&
                    <Fragment>
                        <h3>Track ID: {trackID}</h3>
                        <br/>
                        {data.events.length > 1 ?
                            <ul>
                                {
                                    data.events.map(event => (
                                        <li>
                                            <p>{event.operationDateTime}</p>
                                            <p>{event.operationPlaceName}</p>
                                            <p>{event.serviceName}</p>
                                            <p>{event.operationAttribute}</p>
                                            {event.operationPlacePostalCode !== "" &&
                                            <p>Индекс: {event.operationPlacePostalCode}</p>}
                                            {event.itemWeight !== "0" &&
                                            <p>Вес посылки: {event.itemWeight} грамм</p>}
                                            <br/>
                                        </li>))
                                }
                            </ul>
                            : <p>Данный трек-номер не найден</p>
                        }
                    </Fragment>
            }
        </Fragment>
    );
};

Main.propTypes = {

};

const mapStateToProps = state => ({
    info: state.main.info,
    trackID: state.main.trackID,
    auth: state.auth
});

export default connect(mapStateToProps, {getTrackInfo})(Main);
