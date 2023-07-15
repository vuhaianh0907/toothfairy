import React from 'react';
import './Worksheet.css';

export default function Worksheet() {
    return (
        <div className='ws'>
            <table className='tbl'>
                <thead className='theader'>
                    <tr className='trow'>
                        <th></th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                        <th>Sunday</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='trow-h'>7:00-8:00</td>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td className='trow-h'>8:00-9:00</td>
                        <td>8</td>
                        <td>9</td>
                        <td>10</td>
                        <td>11</td>
                        <td>12</td>
                        <td>13</td>
                        <td>14</td>
                    </tr>
                    <tr>
                        <td className='trow-h'>9:00-10:00</td>
                        <td>15</td>
                        <td>16</td>
                        <td>17</td>
                        <td>18</td>
                        <td>19</td>
                        <td>20</td>
                        <td>21</td>
                    </tr>
                    <tr>
                        <td className='trow-h'>10:00-11:00</td>
                        <td>22</td>
                        <td>23</td>
                        <td>24</td>
                        <td>25</td>
                        <td>26</td>
                        <td>27</td>
                        <td>28</td>
                    </tr>
                    <tr className='brt'>
                        <td colSpan="8"
                         role='columnheader'
                         >Break time</td>
                    </tr>
                  
                    <tr>
                        <td className='trow-h'>13:00-14:00</td>
                        <td>29</td>
                        <td>30</td>
                        <td>31</td>
                        <td>32</td>
                        <td>33</td>
                        <td>34</td>
                        <td>35</td>
                    </tr>
                    <tr>
                        <td className='trow-h'>14:00-15:00</td>
                        <td>36</td>
                        <td>37</td>
                        <td>38</td>
                        <td>39</td>
                        <td>40</td>
                        <td>41</td>
                        <td>42</td>
                    </tr>
                    <tr>
                        <td className='trow-h'>15:00-16:00</td>
                        <td>43</td>
                        <td>44</td>
                        <td>45</td>
                        <td>46</td>
                        <td>47</td>
                        <td>48</td>
                        <td>49</td>
                    </tr>
                    <tr>
                        <td className='trow-h'>16:00-17:00</td>
                        <td>50</td>
                        <td>51</td>
                        <td>52</td>
                        <td>53</td>
                        <td>54</td>
                        <td>55</td>
                        <td>56</td>
                    </tr>
                </tbody>


            </table>


        </div>

    );
}