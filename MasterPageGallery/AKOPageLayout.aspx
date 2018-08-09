<%@ Page Language="C#" Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage,Microsoft.SharePoint.Publishing,Version=14.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="SharePointWebControls" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="PublishingWebControls" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="PublishingNavigation" Namespace="Microsoft.SharePoint.Publishing.Navigation" Assembly="Microsoft.SharePoint.Publishing, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceholderID="PlaceHolderAdditionalPageHead" runat="server">
	<SharePointWebControls:UIVersionedContent UIVersion="4" runat="server">
		<ContentTemplate>
			<SharePointWebControls:CssRegistration name="<% $SPUrl:~sitecollection/Style Library/~language/Core Styles/page-layouts-21.css %>" runat="server"/>
            <SharePointWebControls:CssRegistration name="<% $SPUrl:~sitecollection/SiteAssets/css/ako.css %>" runat="server"/>
            
            <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css">
  
            <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js"></script>

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
                    /*height: 522px;*/
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
<asp:Content ContentPlaceholderID="PlaceHolderPageTitleInTitleArea" runat="server">
	<SharePointWebControls:UIVersionedContent UIVersion="4" runat="server">
		<ContentTemplate>
			<SharePointWebControls:FieldValue FieldName="Title" runat="server" />
		</ContentTemplate>
	</SharePointWebControls:UIVersionedContent>
</asp:Content>
<asp:Content ContentPlaceholderID="PlaceHolderTitleBreadcrumb" runat="server"> 
    <SharePointWebControls:UIVersionedContent UIVersion="4" runat="server"> 
        <ContentTemplate> 
            <SharePointWebControls:ListSiteMapPath runat="server" SiteMapProviders="CurrentNavigation" RenderCurrentNodeAsLink="false" PathSeparator="" CssClass="s4-breadcrumb" NodeStyle-CssClass="s4-breadcrumbNode" CurrentNodeStyle-CssClass="s4-breadcrumbCurrentNode" RootNodeStyle-CssClass="s4-breadcrumbRootNode" NodeImageOffsetX=0 NodeImageOffsetY=353 NodeImageWidth=16 NodeImageHeight=16 NodeImageUrl="/_layouts/images/fgimg.png" HideInteriorRootNodes="true" SkipLinkText="" /> 
        </ContentTemplate> 
    </SharePointWebControls:UIVersionedContent> 
</asp:Content>
<asp:Content ContentPlaceholderID="PlaceHolderPageDescription" runat="server">
	<SharePointWebControls:ProjectProperty Property="Description" runat="server"/>
</asp:Content>
<asp:Content ContentPlaceholderID="PlaceHolderMain" runat="server">
	<div class="container-fluid nopadding">
        <div class="row">
    	    <div class="col-xs-12 webpartcontainer">
    		    <WebPartPages:WebPartZone runat="server" Title="Form" ID="WPZForm"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone>
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