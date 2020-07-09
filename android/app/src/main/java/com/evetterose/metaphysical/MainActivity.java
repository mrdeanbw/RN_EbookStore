package com.evetterose.metaphysical;

import android.os.Bundle;
import android.view.WindowManager;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ebookstore";
  }
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      SplashScreen.show(this);  // here 
      getWindow().setFlags(
              WindowManager.LayoutParams.FLAG_SECURE,
              WindowManager.LayoutParams.FLAG_SECURE);
     }
}
