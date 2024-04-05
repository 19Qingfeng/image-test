import React from 'react';
import { Button } from '../../src/components/Button';
import { render } from '@testing-library/react';
import { JSDOM } from 'jsdom';

describe('Test button', () => {
  let doc: Document;
  let container: HTMLDivElement;

  beforeAll(() => {
    // 创建一个 js dom 对象
    const dom = new JSDOM('<!DOCTYPE html><body></body></p>', {
      url: 'http://localhost/'
    });
    const win = dom.window;
    doc = win.document;

    (global as any).window = win;

    // 这里相当于模拟了一个 window 的 JSDOM 环境，因为 render 方法需要用到
    const keys = [
      ...Object.keys(win),
      'HTMLElement',
      'SVGElement',
      'ShadowRoot',
      'Element',
      'File',
      'Blob'
    ].filter((key) => !(global as any)[key]);

    keys.forEach((key) => {
      (global as any)[key] = win[key];
    });
  });

  beforeEach(() => {
    // container 为 root Dom 节点
    doc.body.innerHTML = `<div id="root"></div>`;
    container = doc.querySelector<HTMLDivElement>('#root')!;
  });

  it('normal', async () => {
    // 重置页面
    await jestPuppeteer.resetPage();
    // 导航到对应页面
    await page.goto(`file://${process.cwd()}/index.html`);
    // 添加组件样式内容
    await page.addStyleTag({
      path: `${process.cwd()}/src/components/button.css`
    });

    let html: string;

    let element = <Button />;

    // 将 Button 组件渲染到 container 中
    const { unmount } = render(element, {
      container
    });
    // 获取 Button 组件渲染后的 HTML 字符串
    html = container.innerHTML;
    unmount();

    // 更新 puppeteer 开启的 HTML 中的内容
    await page.evaluate((innerHTML) => {
      document.querySelector('#root')!.innerHTML = innerHTML;
    }, html);

    // 对于 Button 截屏
    const image = await page.screenshot();

    // 对于截屏内容进行视觉回归
    expect(image).toMatchImageSnapshot();
  });

  it('hover', async () => {
    // 重置页面
    await jestPuppeteer.resetPage();
    // 导航到对应页面
    await page.goto(`file://${process.cwd()}/index.html`);
    // 添加组件样式内容
    await page.addStyleTag({
      path: `${process.cwd()}/src/components/button.css`
    });

    let html: string;

    let element = <Button />;

    // 将 Button 组件渲染到 container 中
    const { unmount } = render(element, {
      container
    });
    // 获取 Button 组件渲染后的 HTML 字符串
    html = container.innerHTML;
    unmount();

    // 更新 puppeteer 开启的 HTML 中的内容
    await page.evaluate((innerHTML) => {
      document.querySelector('#root')!.innerHTML = innerHTML;
    }, html);

    // hover
    await page.hover('.ctrip-button');

    // 对于 Button 截屏
    const image = await page.screenshot();

    // 对于截屏内容进行视觉回归
    expect(image).toMatchImageSnapshot();
  });
});
