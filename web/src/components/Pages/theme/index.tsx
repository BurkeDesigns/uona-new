import React, { useEffect, useState } from "react";
import "./styles.css";
import {
	// Accordion,
	AnnouncementBar,
	Avatar,
	Button,
	Icon,
	ImageBlock,
	Input,
	List,
	Pagination,
	Text,
} from "@blocks";
import Accordion from "@components/Accordion";
import ImageAndTextBlock from "@components/ImageAndTextBlock/bilateral";
import StaggeredImageAndTextBlock from "@components/ImageAndTextBlock/staggered";
import CircleIcon from "@components/Icon/circle";
import { H4 } from "@components/Text";

// import { H1, H4 } from "@components/Text";
// import Text from "@components/Text";
// import Button from "@components/Button";
// import Icon from "@components/Icon";
// import CircleIcon from "@components/Icon/circle";
// import Input from "@components/Input";
// import Accordion from "@components/Accordion";
// import ArticleCarousel from "@components/ArticleCarousel";
// import Avatar from "@components/Avatar";
// import AnnouncementBar from "@components/AnnouncementBar";

const Component = () => {
	return (
		<>
			<div className="container">
				<div className="pageTitle">
					<H4>Typography</H4>
				</div>
				<div className="section">
					<Text as="h1">HEADLINE 1</Text>
					<Text as="h2">HEADLINE 2</Text>
					<Text as="h3">HEADLINE 3</Text>
					<Text as="h4">HEADLINE 4</Text>
					<Text as="h5">HEADLINE 5</Text>
					<br />
					<Text as="h1" font="sub1">
						Subhead 1
					</Text>
					<Text as="h2" font="sub2">
						Subhead 2
					</Text>
					<Text as="h3" font="sub3">
						Subhead 3
					</Text>
					<Text as="h4" font="sub4">
						Subhead 4
					</Text>
				</div>
				<div className="section">
					<Text as="p" font="bodyL">
						Body Large
					</Text>
					<Text as="p" font="bodyLBold">
						Body Large Bold
					</Text>
					{/* <Text as="p" font="TextLgEmphasis">Text Large Emphasis</Text> */}
					<br />
					<Text as="p">Body Medium</Text>
					<Text as="p" font="bodyMBold">
						Body Medium Bold
					</Text>
					{/* <Text as="p" font="TextMdEmphasis">Text Medium Emphasis</Text> */}
					<br />
					<Text as="p" font="bodyS">
						Body Small
					</Text>
					<Text as="p" font="bodySBold">
						Body Small Bold
					</Text>
					{/* <Text as="p" font="bodySBold">Text Small Emphasis</Text> */}
				</div>
				<div className="section">
					<Text as="p" font="eyebrow">
						Eyebrow
					</Text>
				</div>
				<div className="section">
					<Text as="p" font="button">
						BUTTON
					</Text>
				</div>
				<div className="pageTitle">
					<Text as="h5">Change Text Color</Text>
				</div>
				<div className="section">
					<Text color="kc-red">Example text color</Text>
				</div>

				<div className="pageTitle">
					<H4>Buttons</H4>
				</div>
				<div className="section" style={{ background: "#f1f1f1" }}>
					<div className="listHorz">
						<Button url="https://google.com">Primary</Button>
						<Button disabled>Disabled</Button>
					</div>
					<div className="listHorz">
						<Button variant="primaryBlack">Primary Black</Button>
					</div>
					<br />
					<div className="listHorz">
						<Button variant="secondary">Secondary</Button>
					</div>
					<div className="listHorz">
						<Button variant="secondaryWhite">
							Secondary White
						</Button>
					</div>
					<br />
					<div className="listHorz">
						<Button variant="tertiary" leftIcon="file">
							Tertiary
						</Button>
					</div>
					<div className="listHorz">
						<Button variant="tertiaryWhite" leftIcon="file">
							Tertiary White
						</Button>
					</div>
				</div>

				<div className="pageTitle">
					<H4>Icons</H4>
				</div>
				<div className="section" style={{ background: "#f1f1f1" }}>
					<Text font="bodyLBold">Medium Icons</Text>
					<div className="listHorz">
						<Icon name="file" />
						<Icon name="chevron-left" />
						<Icon name="chevron-right" />
						<Icon name="chevron-up" />
						<Icon name="close" />
						<Icon name="fax" />
						<Icon name="menu" />
						<Icon name="minus" />
						<Icon name="phone" />
						<Icon name="plus" />
						<Icon name="search" />
					</div>
					<br />
					<Text font="bodyLBold">Small Icons</Text>
					<div className="listHorz">
						<Icon name="file" size="sm" />
						<Icon name="chevron-left" size="sm" />
						<Icon name="chevron-right" size="sm" />
						<Icon name="chevron-up" size="sm" />
						<Icon name="close" size="sm" />
						<Icon name="fax" size="sm" />
						<Icon name="menu" size="sm" />
						<Icon name="minus" size="sm" />
						<Icon name="phone" size="sm" />
						<Icon name="plus" size="sm" />
						<Icon name="search" size="sm" />
					</div>
					<br />
					<Text font="bodyLBold">Custom Size Icons</Text>
					<div className="listHorz">
						<Icon name="search" size={45} />
					</div>
					<br />
					<Text font="bodyLBold">Social Media Icons</Text>
					<div className="listHorz">
						<Icon name="facebook" />
						<Icon name="instagram" />
						<Icon name="linkedin" />
						<Icon name="twitter" />
						<Icon name="vimeo" />
						<Icon name="yelp" />
						<Icon name="youtube" />
					</div>
					<br />
					<Text font="bodyLBold">Control Icons</Text>
					<div className="listHorz">
						<CircleIcon icon="chevron-left" />
						<CircleIcon icon="chevron-right" />
					</div>
					<div className="listHorz">
						<CircleIcon
							icon="chevron-left"
							variant="outline-white"
						/>
						<CircleIcon
							icon="chevron-right"
							variant="outline-white"
						/>
					</div>
					<div className="listHorz">
						<CircleIcon icon="chevron-left" variant="black" />
						<CircleIcon icon="chevron-right" variant="black" />
					</div>
					<div className="listHorz">
						<CircleIcon icon="plus" variant="outline-white" />
						<CircleIcon icon="close" variant="outline-white" />
					</div>
				</div>

				<div className="pageTitle">
					<H4>Fonts</H4>
				</div>
				<div className="section">
					<div className="listHorz" style={{ gap: "30px" }}>
						<div className="list" style={{ textAlign: "center" }}>
							<Text as="h1">Aa</Text>
							<Text as="p" font="bodyS">
								Trade Gothic Next
							</Text>
						</div>
					</div>
				</div>

				<div className="pageTitle">
					<H4>Colors</H4>
				</div>
				<div className="section">
					<div className="listHorz" style={{ gridGap: "30px" }}>
						<div className="list" style={{ textAlign: "center" }}>
							<div
								className="circle"
								style={
									{
										"--bg": "var(--kc-red)",
									} as React.CSSProperties
								}
							></div>
							<Text as="p" font="bodyMBold">
								KC Red
							</Text>
							<Text as="p" font="bodyS">
								#E60012
							</Text>
							<Text as="p" font="bodyS">
								--kc-red
							</Text>
						</div>
						<div className="list" style={{ textAlign: "center" }}>
							<div
								className="circle"
								style={
									{
										"--bg": "var(--kc-white)",
									} as React.CSSProperties
								}
							></div>
							<Text as="p" font="bodyMBold">
								KC White
							</Text>
							<Text as="p" font="bodyS">
								#FFFFFF
							</Text>
							<Text as="p" font="bodyS">
								--kc-white
							</Text>
						</div>
						<div className="list" style={{ textAlign: "center" }}>
							<div
								className="circle"
								style={
									{
										"--bg": "var(--kc-gray)",
									} as React.CSSProperties
								}
							></div>
							<Text as="p" font="bodyMBold">
								KC Gray
							</Text>
							<Text as="p" font="bodyS">
								#CCD2D5
							</Text>
							<Text as="p" font="bodyS">
								--kc-gray
							</Text>
						</div>
						<div className="list" style={{ textAlign: "center" }}>
							<div
								className="circle"
								style={
									{
										"--bg": "var(--kc-black)",
									} as React.CSSProperties
								}
							></div>
							<Text as="p" font="bodyMBold">
								KC Black
							</Text>
							<Text as="p" font="bodyS">
								#000000
							</Text>
							<Text as="p" font="bodyS">
								--kc-black
							</Text>
						</div>
					</div>
				</div>
				<div className="section">
					<div className="listHorz" style={{ gap: "30px" }}>
						<div className="list" style={{ textAlign: "center" }}>
							<div
								className="circle"
								style={
									{
										"--bg": "var(--gray-1)",
									} as React.CSSProperties
								}
							></div>
							<Text as="p" font="bodyMBold">
								Gray 1
							</Text>
							<Text as="p" font="bodyS">
								#878C8E
							</Text>
							<Text as="p" font="bodyS">
								--gray-1
							</Text>
						</div>
						<div className="list" style={{ textAlign: "center" }}>
							<div
								className="circle"
								style={
									{
										"--bg": "var(--gray-2)",
									} as React.CSSProperties
								}
							></div>
							<Text as="p" font="bodyMBold">
								Gray 2
							</Text>
							<Text as="p" font="bodyS">
								#585D5F
							</Text>
							<Text as="p" font="bodyS">
								--gray-2
							</Text>
						</div>
						<div className="list" style={{ textAlign: "center" }}>
							<div
								className="circle"
								style={
									{
										"--bg": "var(--gray-3)",
									} as React.CSSProperties
								}
							></div>
							<Text as="p" font="bodyMBold">
								Gray 3
							</Text>
							<Text as="p" font="bodyS">
								#414546
							</Text>
							<Text as="p" font="bodyS">
								--gray-3
							</Text>
						</div>
					</div>
				</div>

				<div className="pageTitle">
					<Text as="h4">Inputs</Text>
				</div>
				<div className="section" style={{ background: "#f1f1f1" }}>
					<div className="listHorz">
						<Input
							placeholder="Input Placeholder"
							label="Input Label"
						/>
						<Input
							label="Input Error"
							placeholder="Input Placeholder"
							error="Error: example text"
							state="error"
						/>
						<Input
							label="Input Disabled"
							placeholder="Input Disabled"
							disabled
						/>
					</div>
					<div className="listHorz">
						<Input
							as="textarea"
							label="Textarea Label"
							placeholder="Textarea Placeholder"
						/>
						<Input
							as="textarea"
							label="Textarea Error"
							placeholder="Textarea Placeholder"
							error="Error: example text"
							state="error"
						/>
						<Input
							as="textarea"
							label="Textarea Disabled"
							placeholder="Textarea Placeholder"
							disabled
						/>
					</div>
					<div className="listHorz">
						<Input as="select" label="Select Label">
							<option value="1">Value 1</option>
						</Input>
						<Input
							as="select"
							label="Select Error"
							error="Error: example text"
							state="error"
						>
							<option value="1">Value 1</option>
						</Input>
						<Input as="select" label="Select Disabled" disabled>
							<option value="1">Value 1</option>
						</Input>
					</div>
				</div>

				<div className="pageTitle">
					<Text as="h4">Accordion</Text>
				</div>
				<div className="section" style={{ background: "#000" }}>
					<Accordion label="Accordion">
						<Text color="currentColor">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Phasellus tincidunt, lectus sit amet cursus
							scelerisque, ex massa porta magna, quis malesuada
							orci enim vitae odio.
						</Text>
					</Accordion>
					<Accordion label="Accordion" iconPos="left">
						<Text color="currentColor">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Phasellus tincidunt, lectus sit amet cursus
							scelerisque, ex massa porta magna, quis malesuada
							orci enim vitae odio.
						</Text>
					</Accordion>
					<Accordion
						label="Accordion"
						openIcon="plus"
						closeIcon="minus"
						iconPos="left"
					>
						<Text color="currentColor">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Phasellus tincidunt, lectus sit amet cursus
							scelerisque, ex massa porta magna, quis malesuada
							orci enim vitae odio.
						</Text>
					</Accordion>
				</div>

				<div className="pageTitle">
					<Text as="h4">Pagination</Text>
				</div>
				<div className="section">
					<Pagination total={100} align="left" />
				</div>

				<div className="pageTitle">
					<Text as="h4">Image Block</Text>
				</div>
				<div className="section">
					<ImageBlock src="https://images.pexels.com/photos/731022/pexels-photo-731022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
				</div>

				<div className="pageTitle">
					<Text as="h4">Image & Text Block</Text>
				</div>
				<div className="section">
					<ImageAndTextBlock
						variant="bilateral"
						src="https://images.pexels.com/photos/731022/pexels-photo-731022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
						header="Bilateral"
					>
						<Text>
							The bilateral text & image block switches to one
							column on mobile, with the image on top.
						</Text>
						<List el="column xsm center">
							<Button>Button</Button>
						</List>
					</ImageAndTextBlock>
					<ImageAndTextBlock
						variant="bilateral"
						src="https://images.pexels.com/photos/731022/pexels-photo-731022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
						header="Bilateral Left"
						imgPos="left"
					>
						<Text>
							The bilateral text & image block switches to one
							column on mobile, with the image on top.
						</Text>
						<List el="column xsm center">
							<Button>Button</Button>
						</List>
					</ImageAndTextBlock>
					<StaggeredImageAndTextBlock
						variant="staggered"
						src="https://images.pexels.com/photos/731022/pexels-photo-731022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
						header="Staggered"
					>
						<Text>
							The staggered text & image block overlaps the image
							and switches to one column on mobile, with the image
							on top.
						</Text>
						<List el="column xsm center">
							<Button>Button</Button>
						</List>
					</StaggeredImageAndTextBlock>
					<StaggeredImageAndTextBlock
						variant="staggered"
						src="https://images.pexels.com/photos/731022/pexels-photo-731022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
						header="Staggered Right"
						imgPos="right"
					>
						<Text>
							The staggered text & image block overlaps the image
							and switches to one column on mobile, with the image
							on top.
						</Text>
						<List el="column xsm center">
							<Button>Button</Button>
						</List>
					</StaggeredImageAndTextBlock>
				</div>

				<div className="pageTitle">
					<Text as="h4">Avatar</Text>
				</div>
				<div className="section" style={{ background: "#fff" }}>
					<List el="column xxsm">
						<Avatar
							shape="circle"
							size={100}
							name="John Doe"
							tooltipIcon="facebook"
							src="https://shotkit.com/wp-content/uploads/bb-plugin/cache/cool-profile-pic-matheus-ferrero-landscape-6cbeea07ce870fc53bedd94909941a4b-zybravgx2q47.jpeg"
						/>
						<Avatar
							shape="circle"
							name="John Doe"
							src="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/7d2a57d4-23ee-4ccf-b34c-bd6ddbb1f4a8/width=450/00000-3694828998-A%20professional%20profile%20photo%20for%20linkedin%20of%20%20man,%20%20business%20clothing,%20at%20office,%20bokeh%20background,%20deep%20of%20field,%20kkw-ph1%20_lora.jpeg"
						/>
						<Avatar
							shape="square"
							size={100}
							name="John Doe"
							src="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/7d2a57d4-23ee-4ccf-b34c-bd6ddbb1f4a8/width=450/00000-3694828998-A%20professional%20profile%20photo%20for%20linkedin%20of%20%20man,%20%20business%20clothing,%20at%20office,%20bokeh%20background,%20deep%20of%20field,%20kkw-ph1%20_lora.jpeg"
						/>
						<Avatar
							shape="square"
							radius={10}
							name="John Doe"
							src="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/7d2a57d4-23ee-4ccf-b34c-bd6ddbb1f4a8/width=450/00000-3694828998-A%20professional%20profile%20photo%20for%20linkedin%20of%20%20man,%20%20business%20clothing,%20at%20office,%20bokeh%20background,%20deep%20of%20field,%20kkw-ph1%20_lora.jpeg"
						/>
					</List>
				</div>

				<div className="pageTitle">
					<Text as="h4">Announcement Bar</Text>
				</div>
				<div className="section" style={{ background: "#fff" }}>
					<AnnouncementBar
						url="https://google.com"
						icon="youtube"
						iconPos="left"
						color="kc-black"
						body="Announcement Bar"
					/>
				</div>

				<div className="pageTitle">
					<Text as="h4">List Component</Text>
				</div>
				<div className="section" style={{ background: "#fff" }}>
					<Text font="bodyLBold">Default List</Text>
					<Text>Content in the same column.</Text>
					<List el="xsm" className="boxes">
						<div>
							<Text>1</Text>
						</div>
						<div>
							<Text>2</Text>
						</div>
						<div>
							<Text>3</Text>
						</div>
					</List>
					<br />

					<Text font="bodyLBold">Column</Text>
					<Text>Content on the same row.</Text>
					<List el="column xsm" className="boxes">
						<div>
							<Text>1</Text>
						</div>
						<div>
							<Text>2</Text>
						</div>
						<div>
							<Text>3</Text>
						</div>
					</List>
					<br />
					<Text font="bodyLBold">Column Alt</Text>
					<Text>Switches to vertical on mobile view (800px).</Text>
					<List el="column-alt xsm" className="boxes">
						<div>
							<Text>1</Text>
						</div>
						<div>
							<Text>2</Text>
						</div>
						<div>
							<Text>3</Text>
						</div>
					</List>
					<br />
					<Text font="bodyLBold">Column Between</Text>
					<Text>Equal spacing between all children in one row.</Text>
					<List el="column-between xsm" className="boxes">
						<div>
							<Text>1</Text>
						</div>
						<div>
							<Text>2</Text>
						</div>
						<div>
							<Text>3</Text>
						</div>
						<div>
							<Text>4</Text>
						</div>
					</List>

					<br />
					<Text font="bodyLBold">Column Fill</Text>
					<Text>
						Fit as many children who can't be less than 300px wide
						into each row.
					</Text>
					<List el="column-fill xsm" className="boxes">
						<div>
							<Text>1</Text>
						</div>
						<div>
							<Text>2</Text>
						</div>
						<div>
							<Text>3</Text>
						</div>
						<div>
							<Text>4</Text>
						</div>
						<div>
							<Text>5</Text>
						</div>
					</List>

					<br />
					<Text font="bodyLBold">Column Stretch</Text>
					<Text>Stretch children equally to fill one row.</Text>
					<List el="column-stretch xsm" className="boxes">
						<div>
							<Text>1</Text>
						</div>
						<div>
							<Text>2</Text>
						</div>
						<div>
							<Text>3</Text>
						</div>
						<div>
							<Text>4</Text>
						</div>
						<div>
							<Text>5</Text>
						</div>
					</List>

					<br />
					<Text font="bodyLBold">Alt</Text>
					<Text>Switches to horizontal on mobile view (800px).</Text>
					<List
						el="alt xsm"
						className="boxes"
						style={{ height: "200px" }}
					>
						<div>
							<Text>1</Text>
						</div>
						<div>
							<Text>2</Text>
						</div>
						<div>
							<Text>3</Text>
						</div>
					</List>

					<br />
					<Text font="bodyLBold">Between</Text>
					<Text>
						Equal vertical spacing between all children in one
						column.
					</Text>
					<List
						el="between xsm"
						className="boxes"
						style={{ height: "200px" }}
					>
						<div>
							<Text>1</Text>
						</div>
						<div>
							<Text>2</Text>
						</div>
						<div>
							<Text>3</Text>
						</div>
					</List>
				</div>
			</div>
		</>
	);
};

export default Component;
