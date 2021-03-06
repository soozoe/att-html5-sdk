/**
 * Controller that interacts with the Basic SMS application.
 */
Ext.define('SampleApp.controller.sms.Basic', {
    extend: 'Ext.app.Controller',

    requires: [
       'Att.ApiResults',
       'SampleApp.Config',
       'Ext.MessageBox'
    ],

    config: {

        refs: {
            view: 'att-sms-basic',
            responseView: {
                xtype: 'apiresults',
                selector: 'apiresults',
                hidden: true,
                autoCreate: true
            }
        },
        
        control: {
            'att-sms-basic button[action=sendmessage]': {
                tap: 'onSendSms'
            },
            'att-sms-basic button[action=messagestatus]':{
                tap: 'onMessageStatus'
            },
            'att-sms-basic button[action=receivemessage]': {
                tap: 'onReceiveSms'
            },
            'actionsheet button[action=close]': {
                'tap': 'onCloseResponseView'
            }
        }
    },
    
    showResponseView: function(success, response){
        var responseView =  this.getResponseView();
       
        Ext.Viewport.add(responseView);
       
        responseView.setData({
            success: success,
            results: JSON.stringify(response, null, '\t')
        });
       
        responseView.show();    
    },
    
    onCloseResponseView: function(){
        this.getResponseView().hide();
    },

    /**
     * Handler for send Sms button.
     * This will take the parameters in the send sms form to make a call to sendSms API method.
     * It populates the smsId field with the SMS Id property obtained in the response.
     */
    onSendSms: function(btn, event, eOpts){
        var me = this,
            view = me.getView(),
            cfg = SampleApp.Config,
            form = btn.up('formpanel').getValues(),
            message = form.message,
            address, addresses, l, i = 0;

        //check phone numbers
        if(!form.address){
            Ext.Msg.alert(cfg.alertTitle, cfg.invalidPhoneMsg);
            return;
        }
        
        addresses = form.address.split(',');
        
        l = addresses.length;
        for(; i < l ; i++){
            address = addresses[i].trim();
            if(!AttApiClient.util.isValidPhoneNumber(address)){
                Ext.Msg.alert(cfg.alertTitle, cfg.invalidPhoneMsg);
                return;
            }
            addresses[i] = AttApiClient.util.normalizePhoneNumber(address);
        }
        // check message 
        if (message === '') {
            Ext.Msg.alert(cfg.alertTitle, 'Please enter a message');
            return;
        } 
        
        view.setMasked(true);
        var data = {
            addresses: addresses.join(','),
            message: message
        };

        AttApiClient.SMS.sendSms(
            data,
            function (response) {
                view.setMasked(false);
                me.showResponseView(true, response);
                //set the message Id value 
                view.down('formpanel textfield[name=smsId]').setValue(response["outboundSMSResponse"]["messageId"]);
            },
            function(response){
                view.setMasked(false);
                me.showResponseView(false, response);
            }
        )                
    },
    
    /**
     * Handler for Sms Status button.
     * It will get the smsId field value and perform a getSmsStatus call to Provider API.
     */
    onMessageStatus: function(btn, event, eOpts){
        var me = this,
            view = me.getView(),
            cfg = SampleApp.Config,
            form = btn.up('formpanel').getValues(),
            smsId = form.smsId;
    
        // check message 
        if (!smsId) {
            Ext.Msg.alert(cfg.alertTitle, 'Please enter a Message Id');
            return;
        } 
        
        
        view.setMasked(true);
        
        AttApiClient.SMS.smsStatus (
            { id: smsId },
            function (response) {
                if (response.DeliveryInfoList.DeliveryInfo[0].DeliveryStatus == "DeliveredToTerminal") {
                    // clear the message Id value
                    view.down('formpanel textfield[name=smsId]').setValue("");
                }
                view.setMasked(false);
                me.showResponseView(true, response);
            },
            function (response) {
                view.setMasked(false);
                me.showResponseView(false, response);
            }
        )        
    },
    
    /**
     * Handler for receive sms button.
     * Performs a receiveSms call to retrieve messages in the shortcode inbox.
     */
    onReceiveSms: function(btn, event, eOpts){
        var me = this,
            view = me.getView(),
            registrationId = btn.config.regId;
        
        view.setMasked(true);
        
        AttApiClient.SMS.getSms (
        { shortcode: registrationId },
            function (response) {
                view.setMasked(false);
                me.showResponseView(true, response);
            },
            function (response) {
                view.setMasked(false);
                me.showResponseView(false, response);
            }
        )        
    }
});