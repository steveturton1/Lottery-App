/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        } else {
            // for desktop debugging.
            this.onDeviceReady();
        }

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        //var elem = document.getElementById('myButton');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        if (id === 'deviceready') {
            document.getElementById('GoRefreshButton').addEventListener("click", thunderballWithRefresh);
            document.getElementById('Reset').addEventListener("click", thunderballReset);

            document.getElementById('CancelButton').addEventListener("click", cancelThunderball);
            //document.getElementById('VibrateButton').addEventListener("click", vibrateThunderball);
            //document.getElementById('AlertButton').addEventListener("click", alertThunderball);
            document.getElementById('BigWinnerButton').addEventListener("click", bigWinner);

            var msg = device.cordova + "/" + device.model + "/" + device.platform;

            //if ('vibrate' in navigator) {
            //    msg += "/Vibrate";
            //} else {
            //    msg += "/No Vibrate";
            //}
            document.getElementById('APPSTUFF').innerHTML = msg;

            document.getElementById('WatchAccOn').addEventListener("click", watchAccOn);
            document.getElementById('WatchAccOff').addEventListener("click", watchAccOff);
            document.getElementById('ToastButton').addEventListener("click", toast);


            //document.getElementById('WatchCompassOn').addEventListener("click", watchCompassOn);
            //document.getElementById('WatchCompassOff').addEventListener("click", watchCompassOff);
        }
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        //console.log('Received Event: ' + id);
    }
};
app.initialize();