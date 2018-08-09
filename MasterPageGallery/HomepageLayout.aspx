﻿<%@ Page Language="C#" Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage,Microsoft.SharePoint.Publishing,Version=14.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="SharePointWebControls" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="PublishingWebControls" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="PublishingNavigation" Namespace="Microsoft.SharePoint.Publishing.Navigation" Assembly="Microsoft.SharePoint.Publishing, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceholderID="PlaceHolderAdditionalPageHead" runat="server">
	<SharePointWebControls:UIVersionedContent UIVersion="4" runat="server">
		<ContentTemplate>
			<SharePointWebControls:CssRegistration name="<% $SPUrl:~sitecollection/Style Library/~language/Core Styles/page-layouts-21.css %>" runat="server"/>
			<PublishingWebControls:EditModePanel runat="server">
				<!-- Styles for edit mode only-->
				<SharePointWebControls:CssRegistration name="<% $SPUrl:~sitecollection/Style Library/~language/Core Styles/edit-mode-21.css %>" After="<% $SPUrl:~sitecollection/Style Library/~language/Core Styles/page-layouts-21.css %>" runat="server"/>
			</PublishingWebControls:EditModePanel>
            <style type="text/css">
                body #s4-leftpanel {
                    display: none !important;
                }

                .s4-ca {
                    margin-left: 0px !important;
                }

                .webpartcontainer {
                    position: relative;
                    display: block;
                }
            </style>
		</ContentTemplate>
	</SharePointWebControls:UIVersionedContent>
</asp:Content>
<asp:Content ContentPlaceholderID="PlaceHolderPageTitle" runat="server">
	<SharePointWebControls:UIVersionedContent UIVersion="4" runat="server">
		<ContentTemplate>
			<SharePointWebControls:ListProperty Property="Title" runat="server"/> - <SharePointWebControls:FieldValue FieldName="Title" runat="server"/>
		</ContentTemplate>
	</SharePointWebControls:UIVersionedContent>
</asp:Content>
<asp:Content ContentPlaceholderID="PlaceHolderMain" runat="server">
	<div class="container-fluid">
        <div class="row">
    	    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 text-center webpartcontainer">
    		    <WebPartPages:WebPartZone runat="server" Title="R1C1" ID="WPZR1C1"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
    	    </div>
    	    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-4 text-center webpartcontainer">
    		    <WebPartPages:WebPartZone runat="server" Title="R1C2" ID="WPZR1C2"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
    	    </div>
        </div>
        <div class="row">
    	    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 text-center webpartcontainer">
    		    <WebPartPages:WebPartZone runat="server" Title="R2C1" ID="WPZR2C1"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
    	    </div>
    	    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-4 text-center webpartcontainer">
    		    <WebPartPages:WebPartZone runat="server" Title="R2C2" ID="WPZR2C2"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
    	    </div>
        </div>
        <div class="row">
		    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 text-center webpartcontainer">
			    <WebPartPages:WebPartZone runat="server" Title="R3C1" ID="WPZR3C1"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
		    </div>
		    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 text-center webpartcontainer">
			    <WebPartPages:WebPartZone runat="server" Title="R3C2" ID="WPZR3C2"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
		    </div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 text-center webpartcontainer">
			    <WebPartPages:WebPartZone runat="server" Title="R3C3" ID="WPZR3C3"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
		    </div>
        </div>
        <div class="row">
		    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 text-center webpartcontainer">
			    <WebPartPages:WebPartZone runat="server" Title="R4C1" ID="WPZR4C1"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
		    </div>
		    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 text-center webpartcontainer">
			    <WebPartPages:WebPartZone runat="server" Title="R4C2" ID="WPZR4C2"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
		    </div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 text-center webpartcontainer">
			    <WebPartPages:WebPartZone runat="server" Title="R4C3" ID="WPZR4C3"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
		    </div>
        </div>
    </div>
    <div id="TRIPModal" class="modal tripmodal">
	    <div class="modal-vertical-alignment-helper">
		    <div class="modal-dialog modal-vertical-align-center">
			    <div class="modal-content modal-content-inherit">
				    <div class="panel panel-info">
					    <div class="panel-heading"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						    ×</button><h3 class="panel-title" id="TRIPModalTitle"></h3></div>
					    <div class="panel-body">
						    <div class="container-fluid" id="TRIPModalBody"></div>
					    </div>
				    </div>
			    </div>
		    </div>
	    </div>
    </div>
</asp:Content>